import { Flex, Button, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { useSwitchNetwork } from "wagmi";
import { CHAIN_ID } from "../lib/const";

export const SwitchNetwork: React.FC = () => {
  const { switchNetwork } = useSwitchNetwork();

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
