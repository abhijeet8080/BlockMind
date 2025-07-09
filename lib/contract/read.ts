// lib/contract/read.ts
import { publicClient } from '../viemClient';
import { CONTRACT_ADDRESS } from '@/constants/Prompt';
import abi from '@/contract/Abi.json';

export async function getTaskFromContract(address: `0x${string}`, id: number) {
  return await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'getTask',
    args: [id],
    account: address,
  });
}

export async function getAllTasksFromContract(address: `0x${string}`) {
  return await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'allUserTasks',
    account: address,
  });
}
