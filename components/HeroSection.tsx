'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Sparkles, Users, Zap } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered',
    desc: 'Smart task management with AI assistance',
  },
  {
    icon: Shield,
    title: 'Web3 Secure',
    desc: 'Decentralized and secure by design',
  },
  {
    icon: Users,
    title: 'Collaborative',
    desc: 'Work together seamlessly',
  },
];

export const HeroSection = () => {
  const [dots, setDots] = useState<{ left: string; top: string }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 15 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setDots(generated);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/10 to-background">
      {/* Floating dots */}
      <div className="absolute inset-0 pointer-events-none">
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/20"
            style={{ left: dot.left, top: dot.top }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 text-center max-w-3xl">
        {/* Tagline */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center gap-2 text-primary mb-4"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-base font-medium">The Future of Task Management</span>
          <Sparkles className="w-5 h-5" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-4"
        >
          AI-Powered Web3{' '}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Task Manager
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-8"
        >
          Experience next-gen productivity with decentralized security, collaborative tools, and
          intelligent task assistance — all in one.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/chat">
            <button className="inline-flex items-center gap-2 px-6 py-3 text-white dark:text-black bg-primary rounded-lg hover:bg-primary/90 transition-all font-semibold">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <button className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition">
            Learn More
          </button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-xl border border-border bg-muted/30 backdrop-blur-sm"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full shadow-sm dark:text-black">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
