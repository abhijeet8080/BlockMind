'use client';

import { useEffect, useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import { InputForm } from './InputForm';
import { TypingIndicator } from './TypingIndicator';
import { ChatHistory } from './ChatHistory';
import { useChatHandlers } from '../hooks/useChatHandlers';

export type Message = {
  id: number;
  message: string;
  isUser: boolean;
  timestamp: string;
};

export const ChatInterface = () => {
  const { address } = useAccount();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      message: "Hello! I'm your AI task manager. How can I help you organize your tasks today?",
      isUser: false,
      timestamp: '00:00',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => scrollToBottom(), [messages]);

  const { handleSubmit } = useChatHandlers({
    messages,
    setMessages,
    setInputValue,
    setIsTyping,
    address,
  });

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background via-muted/10 to-background" suppressHydrationWarning>
        <div className="flex-1 overflow-y-auto pt-20 md:pt-24 px-4 pb-4 space-y-6">


        <div className="max-w-4xl mx-auto">
          <ChatHistory messages={messages} />
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <InputForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
