// WalletButton.tsx
"use client";

import { Wallet } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const WalletButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
        authenticationStatus,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {!connected ? (
              <Button
                onClick={openConnectModal}
                variant="outline"
                className="gap-2"
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            ) : chain.unsupported ? (
              <Button onClick={openChainModal} variant="destructive">
                Wrong Network
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={openChainModal}
                  variant="ghost"
                  className="gap-2"
                >
                  {chain.hasIcon && chain.iconUrl && (
                    <Image
                      src={chain.iconUrl}
                      alt={chain.name ?? "Chain icon"}
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                  )}
                  {chain.name}
                </Button>
                <Button onClick={openAccountModal} variant="default">
                  {account.displayName}
                </Button>
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
