import { Text, Flex, Button, Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { CHAIN_ID } from "../lib/const";
import { useCallback } from "react";
import ConnectWallet from "../components/ConnectWallet";
import { useTaskContract } from "../hooks/useContract";
import { Tasks } from "../components/Tasks";

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
    <Container maxW="container.lg">
      <Tasks />
    </Container>
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
