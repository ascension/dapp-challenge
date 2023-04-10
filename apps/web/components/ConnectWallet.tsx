import { useConnect } from "wagmi";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useCallback } from "react";

export default function ConnectWallet() {
  const { connect, connectors } = useConnect();

  const handleConnect = useCallback(async () => {
    try {
      connect({ connector: connectors[0] });
    } catch (error) {
      console.log("Error connecting to the local Hardhat node:", error);
    }
  }, [connect, connectors]);

  return (
    <Flex justify="center" align="center" flexDirection="column" height="100vh">
      <Heading color="white">Welcome to Ethereum Task Manager</Heading>
      <Text color="rgb(53, 219, 255)">Start by connecting your wallet</Text>
      <Button onClick={handleConnect} mt={4}>
        Connect Wallet
      </Button>
    </Flex>
  );
}
