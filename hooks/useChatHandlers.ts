// components/chat/useChatHandlers.ts
import {
  useCreateTask,
  useMarkDone,
  useUpdateTask,
  useDeleteTask,
  useWithdraw,
  useContractBalance
} from '@/hooks/useTodoContract';
import { Message } from '../components/ChatInterface';

export const useChatHandlers = ({
  messages,
  setMessages,
  setInputValue,
  setIsTyping,
  address
}: {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setInputValue: (val: string) => void;
  setIsTyping: (val: boolean) => void;
  address: `0x${string}` | undefined;
}) => {
  const { create } = useCreateTask();
  const { mark } = useMarkDone();
  const { update } = useUpdateTask();
  const { remove } = useDeleteTask();
  const { withdraw } = useWithdraw();
  const balance = useContractBalance();

  const handleAction = async (func: string, input: any, responseId: number) => {
    try {
      let responseText = '✅ Action completed.';

      switch (func) {
        case 'createTask':
          await create(input);
          responseText = `Task "${input.title}" created successfully.`;
          break;
        case 'markDone':
          await mark(input.id);
          responseText = `Marked task ${input.id} as done.`;
          break;
        case 'updateTask':
          await update(input);
          responseText = `Updated task ${input.id} successfully.`;
          break;
        case 'deleteTask':
          await remove(input.id);
          responseText = `Deleted task ${input.id}.`;
          break;
        case 'withdraw':
          await withdraw();
          responseText = `Withdrawn contract balance successfully.`;
          break;
        case 'contractBalance':
          responseText = `Current contract balance is ${balance.data || '0'} wei.`;
          break;
        default:
          responseText = `⚠️ Function "${func}" is not implemented yet.`;
      }

      setMessages(prev => [...prev, {
        id: responseId,
        message: responseText,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error(`❌ Error executing "${func}":`, err);
      setMessages(prev => [...prev, {
        id: responseId,
        message: `❌ Failed to execute "${func}". Check the logs.`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  };

  const handleSubmit = async () => {
    if (!address) return;
    if (!messages || !setMessages) return;

    const newMessage: Message = {
      id: messages.length + 1,
      message: '',
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    newMessage.message = (document.querySelector('input') as HTMLInputElement)?.value || '';
    if (!newMessage.message.trim()) return;

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: newMessage.message,
          user: {
            walletAddress: address
          }
        })
      });

      const data = await res.json();
      const ai = typeof data.reply === 'string' ? JSON.parse(data.reply) : data.reply;

      if (ai.type === 'output') {
        setMessages(prev => [...prev, {
          id: newMessage.id + 1,
          message: ai.output,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } else if (ai.type === 'action') {
        await handleAction(ai.function, ai.input, newMessage.id + 1);
      }
    } catch (error) {
      console.error('🔥 Chat request failed:', error);
      setMessages(prev => [...prev, {
        id: newMessage.id + 1,
        message: '⚠️ Something went wrong talking to AI. Please try again.',
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }

    setIsTyping(false);
  };

  return { handleSubmit };
};
