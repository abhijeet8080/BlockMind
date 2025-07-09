'use client';

import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import React from 'react';

type ChatMessageProps = {
  message: string;
  isUser: boolean;
  timestamp: string;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <motion.div
      suppressHydrationWarning
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse gap-2' : ''}`}
    >
      {/* Avatar */}
      <div 
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-gradient-to-br from-red-500 to-orange-500'
            : 'bg-muted text-muted-foreground'
        }`}
      >
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Message bubble */}
      <div className={`${isUser ? 'items-end text-right' : ''}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm md:text-base w-fit break-words ${
            isUser
              ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
              : 'bg-muted border border-border text-foreground'
          }`}
        >
          <p>{message}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-2 block">
          {timestamp}
        </span>
      </div>
    </motion.div>
  );
};
