'use client';

import { useEffect } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { ChatInterface } from '@/components/ChatInterface';

export default function ChatPage() {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    if (!isConnected && openConnectModal) {
      openConnectModal();
    }
  }, [isConnected, openConnectModal]);

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center text-4xl text-white font-semibold bg-gradient-to-br from-black via-red-950/20 to-orange-950/10">
        <p>Please connect your wallet to continue.</p>
      </div>
    );
  }

  return (
    <div>
      <ChatInterface />
    </div>
  );
}
