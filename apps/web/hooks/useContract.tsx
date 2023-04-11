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
    console.log("checkContractDeployment", signer?.provider, CONTRACT_ADDRESS);
    if (!signer?.provider || !CONTRACT_ADDRESS) return;

    try {
      const contractCode = await signer?.provider?.getCode(CONTRACT_ADDRESS);
      console.log({ contractCode, contractIsDeployed });
      if (contractCode === "0x") {
        setContractIsDeployed({ type: "deployed" });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [contractIsDeployed, signer?.provider]);

  const getTasks = useCallback(async () => {
    if (!contract || !isMounted) return;

    const tasks = await contract.getTasks();
    setTasks(tasks);
  }, [contract, isMounted]);

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
    contract,
    tasks,
    setTasks,
  };
};
