import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center space-x-3"
  >
    <div className="w-8 h-8 bg-muted text-primary rounded-full flex items-center justify-center">
      <Bot className="w-4 h-4" />
    </div>
    <div className="bg-muted/40 border border-border rounded-2xl px-4 py-3">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
      </div>
    </div>
  </motion.div>
);
