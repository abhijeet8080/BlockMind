import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, hardhat } from 'wagmi/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'My Web3 App',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet, sepolia, hardhat],
  ssr: false,
});