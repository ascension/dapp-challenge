import { Flex, Text } from "@chakra-ui/react";
import { useTaskContract } from "../hooks/useContract";

export default function ConnectWallet() {
  const { isMounted } = useTaskContract();

  if (!isMounted) return null;

  return (
    <Flex justify="center" align="center" flexDirection="column" height="100vh">
      <Text color="rgb(53, 219, 255)">Start by connecting your wallet</Text>
    </Flex>
  );
}
