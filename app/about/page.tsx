"use client";

import { Brain, Code2, Rocket, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function AboutPage() {
  return (
    <motion.section
      className="max-w-4xl mx-auto px-6 py-24 text-foreground"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp} className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          About Abhijeet Kadam
        </h1>
        <p className="text-lg text-muted-foreground">
          Full Stack & Web3 Developer | AI Explorer | B.Tech Graduate
        </p>
      </motion.div>

      <div className="mt-12 space-y-8">
        <motion.div variants={fadeInUp} className="flex items-start gap-4">
          <User className="w-6 h-6 text-primary mt-1" />
          <p>
            I&apos;m <strong>Abhijeet Kadam</strong>, a passionate software
            developer with a B.Tech degree and a strong foundation in{" "}
            <strong>Data Structures & Algorithms</strong>. I specialize in
            building modern, performant, and secure web applications across the
            full stack.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex items-start gap-4">
          <Code2 className="w-6 h-6 text-primary mt-1" />
          <p>
            My core stack includes <strong>Next.js</strong>,{" "}
            <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>,{" "}
            <strong>Node.js</strong>, <strong>MongoDB</strong>, and{" "}
            <strong>Express</strong>. I also leverage tools like{" "}
            <strong>shadcn/ui</strong>, <strong>Wagmi</strong>,{" "}
            <strong>Viem</strong>, <strong>Hardhat</strong>, and{" "}
            <strong>RainbowKit</strong> to build Web3-integrated AI solutions.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex items-start gap-4">
          <Rocket className="w-6 h-6 text-primary mt-1" />
          <div>
            <p className="mb-2">Some of my recent work includes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>AI Task Manager</strong> – A Web3-enabled, AI-powered
                productivity tool.
              </li>
              <li>
                <strong>ConvoCloud</strong> – A full-stack video conferencing
                and collaboration app.
              </li>
              <li>
                <strong>MCP Server</strong> – An AI-powered system for
                automating and managing LinkedIn posts.
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex items-start gap-4">
          <Brain className="w-6 h-6 text-primary mt-1" />
          <p>
            I&apos;m actively building at the intersection of{" "}
            <strong>Web3</strong>, <strong>LLMs</strong>, and{" "}
            <strong>Human-AI interfaces</strong>. With hands-on experience in{" "}
            <strong>Solidity</strong>, <strong>Wagmi</strong>,{" "}
            <strong>Viem</strong>, and <strong>OpenAI</strong> APIs, I'm
            exploring how smart contracts and intelligent agents can power
            autonomous, privacy-focused applications. My current focus is
            integrating <strong>LLM-driven workflows</strong> with on-chain
            logic using tools like <strong>Next.js</strong>,{" "}
            <strong>TypeScript</strong>, and <strong>Framer Motion</strong>.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center mt-12">
          <Link href="/contact">
            <Button className="px-8 py-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white hover:brightness-110 transition">
              Let&apos;s Collaborate
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
