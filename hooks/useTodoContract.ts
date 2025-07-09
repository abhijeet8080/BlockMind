import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import abi from '@/contract/Abi.json';
import { CONTRACT_ADDRESS } from '@/constants/Prompt';

export const useCreateTask = () => {
  const { writeContractAsync, isPending } = useWriteContract();

  const create = async ({
    title,
    description,
   
    isDone,
  }: {
    title: string;
    description: string;
    isDone: boolean;
  }) => {
    console.log("📦 createTask called:", { title, description, isDone });
    return await writeContractAsync({
      abi,
      address: CONTRACT_ADDRESS,
      functionName: 'createTask',
      args: [title, description, isDone],
    });
  };

  return { create, isPending };
};

export const useUpdateTask = () => {
  const { writeContractAsync } = useWriteContract();

  const update = async ({
    id,
    title,
    description,
    
    isDone,
  }: {
    id: number;
    title: string;
    description: string;
    isDone: boolean;
  }) => {
    console.log("✏️ updateTask called:", { id, title, description, isDone });
    return await writeContractAsync({
      abi,
      address: CONTRACT_ADDRESS,
      functionName: 'updateTask',
      args: [id, title, description, isDone],
    });
  };

  return { update };
};

export const useDeleteTask = () => {
  const { writeContractAsync } = useWriteContract();

  const remove = async (id: number) => {
    console.log("🗑 deleteTask called:", id);
    return await writeContractAsync({
      abi,
      address: CONTRACT_ADDRESS,
      functionName: 'deleteTask',
      args: [id],
    });
  };

  return { remove };
};

export const useMarkDone = () => {
  const { writeContractAsync } = useWriteContract();

  const mark = async (id: number) => {
    console.log("✅ markDone called:", id);
    return await writeContractAsync({
      abi,
      address: CONTRACT_ADDRESS,
      functionName: 'markDone',
      args: [id],
    });
  };

  return { mark };
};

export const useAllUserTasks = () => {
  const { address } = useAccount();
  console.log("📄 allUserTasks read by:", address);

  const result = useReadContract({
    abi,
    address: CONTRACT_ADDRESS,
    functionName: 'allUserTasks',
    account: address,
  });

  return result;
};

export const useGetTask = (id: number) => {
  const { address } = useAccount();

  const result = useReadContract({
    abi,
    address: CONTRACT_ADDRESS,
    functionName: 'getTask',
    args: [id],
    account: address,
  });

  return result;
};


export const useWithdraw = () => {
  const { writeContractAsync } = useWriteContract();

  const withdraw = async () => {
    console.log("💸 withdraw called");
    return await writeContractAsync({
      abi,
      address: CONTRACT_ADDRESS,
      functionName: 'withdraw',
      args: [],
    });
  };

  return { withdraw };
};

export const useContractBalance = () => {
  const { address } = useAccount();

  const result = useReadContract({
    abi,
    address: CONTRACT_ADDRESS,
    functionName: 'contractBalance',
    account: address,
  });

  return result;
};
