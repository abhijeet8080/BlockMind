// components/chat/ChatHistory.tsx
import { AnimatePresence } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import { Message } from './ChatInterface';

export const ChatHistory = ({ messages }: { messages: Message[] }) => (
  <AnimatePresence >
    {messages.map((msg) => (
      <div key={msg.id} className="mb-6" >
        <ChatMessage message={msg.message} isUser={msg.isUser} timestamp={msg.timestamp} />
      </div>
    ))}
  </AnimatePresence>
);
