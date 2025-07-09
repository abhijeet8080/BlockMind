// Navbar.tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletButton } from "./WalletButton";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";

const navItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "chat", label: "Chat", href: "/chat" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-9 h-9 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-xl flex items-center justify-center shadow-md"
            >
              <Brain className="w-4 h-4" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors"
            >
              BlockMind
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.id} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  size="sm"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Wallet + Theme Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <WalletButton />
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="flex flex-col px-4 py-3 gap-2">
              {navItems.map((item) => (
                <Link key={item.id} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              <WalletButton />
              <ModeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
