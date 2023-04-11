import {
  Text,
  Flex,
  Button,
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { CHAIN_ID } from "../lib/const";
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from "react";
import ConnectWallet from "../components/ConnectWallet";
import { useTaskContract } from "../hooks/useContract";

const SwitchNetwork: React.FC = () => {
  const { error, isLoading, switchNetwork } = useSwitchNetwork();

  const handleSwitchNetwork = useCallback(async () => {
    if (!switchNetwork) return;
    try {
      await switchNetwork(CHAIN_ID);
    } catch (error) {
      console.log("Error switching to the local Hardhat node:", error);
    }
  }, [switchNetwork]);

  return (
    <Flex flexDir="column">
      <Text color="rgb(53, 219, 255)">Switch to Hardhat Chain to continue</Text>
      <Button onClick={handleSwitchNetwork} colorScheme="blue" size="sm" mt={4}>
        Switch chains
      </Button>
    </Flex>
  );
};

const ConnectedWallet = () => {
  const { isMounted, contractIsDeployed } = useTaskContract();
  const { chain } = useNetwork();

  if (!isMounted) return null;

  if (!contractIsDeployed)
    return <Text color="white">Contract is not deployed yet.</Text>;

  if (chain?.id !== CHAIN_ID) {
    return <SwitchNetwork />;
  }

  return (
    <Flex>
      <Flex>
        <Flex>
          <Flex>
            <Heading color="white">New Task</Heading>
          </Flex>
        </Flex>
        <Box>
          <Heading color="white">Current Tasks</Heading>
          <Tasks />
        </Box>
      </Flex>
    </Flex>
  );
};

const Tasks: React.FC = () => {
  const { tasks, contract } = useTaskContract();

  const [formState, setFormState] = useState({
    name: "",
    description: "",
    dueDate: "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value;
    const key = event.target.id;
    setFormState((prevState) => ({ ...prevState, [key]: newValue }));
  };

  const handleMarkCompleted = async (id: number) => {
    const tx = await contract.completeTask(id);
    await tx.wait();
    // refetch();
  };

  const handleDeleteTask = async (id: number) => {
    const tx = await contract.deleteTask(id);
    await tx.wait();
    // refetch();
  };

  const handleCreateTask: FormEventHandler = async (e) => {
    e.preventDefault();
    const { name, description, dueDate } = formState;
    if (!name || !description || !dueDate) return;

    const timestamp = new Date(dueDate + " UTC").getTime();
    const tx = await contract.createTask(name, description, timestamp);

    // should handle transaction not getting mined here
    await tx.wait();

    setFormState({ name: "", description: "", dueDate: "" });
    // refetch();
  };

  return (
    <Flex
      color="white"
      flexDir="column"
      bg="rgba(14, 10, 49, 0.62)"
      borderRadius={8}
      p={8}
      border="1px solid #2B2852"
    >
      <form onSubmit={handleCreateTask}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input type="text" id="name" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input type="text" id="description" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Due Date</FormLabel>
          <Input type="date" id="dueDate" onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Create Task
        </Button>
      </form>
      <Flex flexDir="column">
        {tasks.map((task) => (
          <Flex
            key={task.id.toString()}
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex
              border="1px solid white"
              p={4}
              borderRadius={8}
              my={2}
              justifyContent="space-between"
            >
              <Box>{task.name}</Box>
              <Box>{task.description}</Box>
            </Flex>
            <ButtonGroup>
              <IconButton
                variant="outline"
                aria-label="Mark Task Completed"
                icon={<CheckIcon color="blue.300" />}
                onClick={() => handleMarkCompleted(task.id.toNumber())}
              />
              <IconButton
                variant="outline"
                aria-label="Mark Task Completed"
                icon={<CloseIcon color="red.300" />}
                onClick={() => handleDeleteTask(task.id.toNumber())}
              />
            </ButtonGroup>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

const Web: NextPage = () => {
  const { isConnected } = useAccount();

  return (
    <Layout>
      <Flex
        width="full"
        height="full"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        minHeight="calc(100vh - 57px)"
      >
        {!isConnected && <ConnectWallet />}
        {isConnected && <ConnectedWallet />}
      </Flex>
    </Layout>
  );
};

export default Web;
