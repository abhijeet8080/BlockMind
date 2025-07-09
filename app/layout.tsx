import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlockMind | AI-Powered Web3 Task Manager",
  description:
    "BlockMind is your intelligent, AI-powered assistant for managing tasks on the blockchain. Seamlessly create, update, and automate Web3 tasks with voice and natural language input.",
    icons: {
    icon: "/icons/logo.png", 
    shortcut: "/icons/logo.png",
  },
  keywords: [
    "BlockMind",
    "AI Task Manager",
    "Web3 Productivity",
    "Blockchain Automation",
    "Smart Contract Tasks",
    "Wagmi",
    "Viem",
    "Next.js",
    "OpenAI",
    "Voice Assistant Web3"
  ],
  authors: [{ name: "Abhijeet Kadam", url: "https://abhijeet-kadam.vercel.app" }],
  creator: "Abhijeet Kadam",
  openGraph: {
    title: "BlockMind | AI-Powered Web3 Task Manager",
    description:
      "Control your tasks on-chain with AI and natural language. Built with Next.js, Wagmi, Viem, and OpenAI.",
    siteName: "BlockMind",
    images: [
      {
        url: '/icons/logo.png',
        width: 1200,
        height: 630,
        alt: "BlockMind App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  themeColor: "#FF5733",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
