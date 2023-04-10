import { Text, Flex, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { CHAIN_ID, isServer } from "../lib/const";
import { useCallback } from "react";
import ConnectWallet from "../components/ConnectWallet";

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

  return <Button onClick={handleSwitchNetwork}>Hook me up bro</Button>;
};

const Web: NextPage = () => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

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
        {isConnected && <Text color="white">Connected</Text>}
        {chain?.id !== CHAIN_ID && <SwitchNetwork />}
        {chain?.id}
      </Flex>
    </Layout>
  );
};

export default Web;
