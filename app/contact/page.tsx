'use client';

import { useState } from "react";
import {
  Mail,
  MessageSquare,
  PhoneCall,
  Panda,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { motion } from "framer-motion";

// Animation Variants
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

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSubmitSuccess(false);

    try {
      // const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SITE_URL}/api/ai/contact`, formState);
      const { data } = await axios.post(`/api/ai/contact`, formState);
      if (data.success) {
        setSubmitSuccess(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        setErrorMessage(data.error || "Something went wrong.");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      setErrorMessage(error.response?.data?.error || "Error sending message.");
    } finally {
      setIsSubmitting(false);
      if (submitSuccess) setTimeout(() => setSubmitSuccess(false), 3000);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-background text-foreground px-4 py-20 md:px-6 lg:px-8"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp} className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-muted-foreground text-lg">
          Whether you have a question, want to collaborate, or just want to say hi — my inbox is always open.
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="max-w-2xl mx-auto bg-muted/30 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-xl"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <motion.div variants={fadeInUp}>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <Input
              id="name"
              placeholder="Your name"
              className="bg-background"
              required
              value={formState.name}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="bg-background"
              required
              value={formState.email}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <Textarea
              id="message"
              rows={5}
              placeholder="Tell me what's on your mind..."
              className="bg-background"
              required
              value={formState.message}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, message: e.target.value }))
              }
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white dark:text-black"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>

            {submitSuccess && (
              <div className="flex items-center text-green-600 mt-2">
                <CheckCircle className="w-5 h-5 mr-2" />
                Message sent successfully!
              </div>
            )}

            {errorMessage && (
              <div className="flex items-center text-red-500 mt-2">
                <AlertCircle className="w-5 h-5 mr-2" />
                {errorMessage}
              </div>
            )}
          </motion.div>
        </form>

        <motion.div
          variants={fadeInUp}
          className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground space-y-2"
        >
          <div className="flex items-center space-x-2">
            <Panda className="w-4 h-4" />
            <a
              href="https://abhijeet-kadam.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Portfolio
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <a href="mailto:kadamabhijeet021@gmail.com" >kadamabhijeet021@gmail.com</a>
          </div>
          <div className="flex items-center space-x-2">
            <PhoneCall className="w-4 h-4" />
            <span>+918080053515</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
