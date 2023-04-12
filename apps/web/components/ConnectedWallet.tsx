import { Container, Text } from "@chakra-ui/react";
import { useNetwork } from "wagmi";
import { useTaskContract } from "../hooks/useContract";
import { CHAIN_ID } from "../lib/const";
import { SwitchNetwork } from "./SwitchNetwork";
import { Tasks } from "./Tasks";

export const ConnectedWallet = () => {
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
