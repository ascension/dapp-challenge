import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { useAccount } from "wagmi";
import ConnectWallet from "../components/ConnectWallet";
import { ConnectedWallet } from "../components/ConnectedWallet";

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
