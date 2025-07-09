// lib/viemClient.ts
import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(), // use Alchemy or Infura for reliability
});
