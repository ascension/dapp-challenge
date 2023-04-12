import { useCallback, useEffect, useReducer, useState } from "react";
import { useContract, useSigner } from "wagmi";
// @ts-ignore
import ContractArtifacts from "@ascension/hardhat/dist/Tasks.json";

import { BigNumber } from "ethers";

type Task = {
  id: BigNumber;
  name: string;
  description: string;
  dueDate: BigNumber;
  completed: boolean;
  completedDate: boolean;
};

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const contractState = (state, action) => {
  switch (action.type) {
    case "deployed":
      return true;
    case "notDeployed":
      return false;
    default:
      return false;
  }
};

export const useTaskContract = () => {
  const { data: signer } = useSigner();
  const [isMounted, setIsMounted] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [contractIsDeployed, setContractIsDeployed] = useReducer(
    contractState,
    true
  );

  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: ContractArtifacts.abi,
    signerOrProvider: signer,
  });

  const checkContractDeployment = useCallback(async () => {
    if (!signer?.provider || !CONTRACT_ADDRESS) return;

    try {
      const contractCode = await signer?.provider?.getCode(CONTRACT_ADDRESS);
      if (contractCode === "0x") {
        setContractIsDeployed({ type: "deployed" });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [signer?.provider]);

  const getTasks = useCallback(async () => {
    if (!contract || !isMounted) return;

    const tasks = await contract.getTasks();
    setTasks(tasks);
  }, [contract, isMounted]);

  const createTask = useCallback(
    async (name: string, description: string, dueDate: string) => {
      const timestamp = new Date(dueDate + " UTC").getTime();
      const tx = await contract.createTask(
        name,
        description,
        timestamp,
        timestamp
      );
      await tx.wait();
      return getTasks();
    },
    [contract, getTasks]
  );

  const markTaskCompleted = useCallback(
    async (id: number) => {
      const tx = await contract.completeTask(id, new Date().getTime());
      await tx.wait();
      await getTasks();
    },
    [contract, getTasks]
  );

  const deleteTask = useCallback(
    async (id: number) => {
      const tx = await contract.deleteTask(id);
      await tx.wait();
      await getTasks();
    },
    [contract, getTasks]
  );

  useEffect(() => {
    checkContractDeployment();
  }, [checkContractDeployment]);

  useEffect(() => {
    if (!contractIsDeployed && !isMounted) return;
    getTasks();
  }, [contract, getTasks, contractIsDeployed, isMounted]);

  return {
    isMounted,
    contractIsDeployed,
    setContractIsDeployed,
    createTask,
    deleteTask,
    markTaskCompleted,
    contract,
    tasks,
    setTasks,
  };
};
