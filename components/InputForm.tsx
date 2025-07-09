'use client';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export const InputForm = ({
  inputValue,
  setInputValue,
  onSubmit,
}: {
  inputValue: string;
  setInputValue: (val: string) => void;
  onSubmit: () => void;
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="p-4 bg-background/80 backdrop-blur-xl border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Describe your task or ask for help..."
            className="w-full px-6 py-4 pr-16 bg-muted/30 text-foreground border-gray-500 placeholder-muted-foreground border  rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          />
          <motion.button
            onClick={onSubmit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!inputValue.trim()}
            className="absolute right-2 top-2 bottom-2 px-4 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
