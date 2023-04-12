import React from "react";
import {
  Box,
  Container,
  Flex,
  Text,
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import Head from "next/head";
import { useAccount, useConnect } from "wagmi";

const NavBar = () => {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex color="white" py={4} px={4} justifyContent="space-between">
      <Box>Web3 Task Manager</Box>
      <Flex alignItems="center" flexDir="row">
        <Button
          onClick={() => {
            if (!isConnected) {
              onOpen();
            }
          }}
          colorScheme="blue"
          size="sm"
        >
          {isConnected
            ? `${address.slice(0, 6)}...${address.slice(
                address.length - 4,
                address.length
              )}`
            : "Connect"}
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bg="rgb(43, 40, 82)"
          color="white"
          boxShadow="rgba(0, 0, 0, 0.31) 0px 0px 113px"
          p={10}
        >
          <ModalBody>
            {connectors.map((cx) => (
              <Flex
                key={cx.id}
                bg="rgb(52, 48, 95)"
                boxShadow="rgba(0, 0, 0, 0.34) 0px 0px 80px"
                borderRadius={8}
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                p={6}
                onClick={() => {
                  connect({ connector: cx });
                  onClose();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 57 56"
                  width="40px"
                  height="40px"
                >
                  <path
                    fill="#E17726"
                    stroke="#E17726"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                    d="M49.24 6.606 31.383 19.82l3.32-7.787L49.24 6.606Z"
                  ></path>
                  <path
                    fill="#E27625"
                    stroke="#E27625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                    d="m8.05 6.606 17.7 13.337-3.162-7.91L8.05 6.606ZM42.81 37.243l-4.751 7.259 10.174 2.8 2.914-9.9-8.337-.159ZM6.16 37.402l2.897 9.9 10.156-2.8-4.734-7.259-8.319.159Z"
                  ></path>
                  <path
                    fill="#E27625"
                    stroke="#E27625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                    d="m18.666 24.982-2.826 4.263 10.068.458-.336-10.835-6.906 6.114ZM38.625 24.982l-7.012-6.237-.23 10.958 10.068-.458-2.826-4.263ZM19.21 44.502l6.095-2.942-5.246-4.087-.848 7.03ZM31.984 41.56l6.076 2.942-.83-7.03-5.246 4.088Z"
                  ></path>
                  <path
                    fill="#D5BFB2"
                    stroke="#D5BFB2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                    d="m38.06 44.503-6.076-2.943.495 3.947-.053 1.674 5.634-2.678ZM19.21 44.503l5.653 2.678-.035-1.674.477-3.947-6.094 2.943Z"
                  ></path>
                  <path
                    fill="#233447"
                    stroke="#233447"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                    d="m24.97 34.865-5.052-1.48 3.568-1.638 1.484 3.118ZM32.32 34.865l1.484-3.118 3.586 1.639-5.07 1.48Z"
                  ></path>
                  <path
                    fill="#CC6228"
                    stroke="#CC6228"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                    d="m19.214 44.503.883-7.259-5.617.159 4.734 7.1ZM37.195 37.244l.866 7.259 4.751-7.1-5.617-.159ZM41.45 29.245l-10.067.458.936 5.162 1.484-3.118 3.585 1.638 4.063-4.14ZM19.92 33.385l3.568-1.638 1.484 3.118.936-5.162-10.068-.458 4.08 4.14Z"
                  ></path>
                  <path
                    fill="#E27525"
                    stroke="#E27525"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                    d="m15.84 29.245 4.221 8.228-.141-4.088-4.08-4.14ZM37.386 33.385l-.16 4.088 4.222-8.228-4.063 4.14ZM25.909 29.703l-.936 5.162 1.183 6.096.265-8.034-.512-3.224ZM31.381 29.703l-.494 3.207.247 8.05 1.184-6.095-.937-5.162Z"
                  ></path>
                  <path
                    fill="#F5841F"
                    stroke="#F5841F"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                    d="m32.32 34.866-1.183 6.095.848.6 5.246-4.088.158-4.087-5.069 1.48ZM19.918 33.386l.141 4.087 5.246 4.087.848-.599-1.183-6.095-5.052-1.48Z"
                  ></path>
                  <path
                    fill="#C0AC9D"
                    stroke="#C0AC9D"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                    d="m32.423 47.18.053-1.674-.46-.388H25.27l-.441.388.035 1.674-5.652-2.678 1.978 1.62 4.01 2.767h6.87l4.028-2.766 1.96-1.621-5.634 2.678Z"
                  ></path>
                  <path
                    fill="#161616"
                    stroke="#161616"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                    d="m31.982 41.56-.848-.6h-4.981l-.848.6-.477 3.946.442-.387h6.747l.46.387-.495-3.946Z"
                  ></path>
                  <path
                    fill="#763E1A"
                    stroke="#763E1A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                    d="m50 20.683 1.502-7.294-2.26-6.783L31.983 19.38l6.642 5.603 9.379 2.73L50.07 25.3l-.9-.652 1.43-1.304-1.095-.845 1.43-1.093-.935-.722ZM5.79 13.39l1.518 7.293-.971.722 1.448 1.093-1.095.845 1.43 1.304-.9.652 2.066 2.413 9.38-2.73 6.64-5.603L8.05 6.606 5.79 13.39Z"
                  ></path>
                  <path
                    fill="#F5841F"
                    stroke="#F5841F"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                    d="m48.001 27.712-9.38-2.73 2.827 4.263-4.221 8.227 5.581-.07h8.337l-3.144-9.69ZM18.666 24.981l-9.38 2.731-3.126 9.69h8.32l5.581.07-4.222-8.227 2.827-4.264ZM31.382 29.704l.6-10.324 2.72-7.347H22.587l2.72 7.347.6 10.324.23 3.241.018 8.017h4.98l.018-8.017.23-3.241Z"
                  ></path>
                </svg>
                <Text>{cx.name}</Text>
                <Text fontSize="sm">
                  Connect your {cx.name.toLocaleLowerCase()} wallet
                </Text>
              </Flex>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export const Layout: React.FC<{
  children?: React.ReactNode;
  withContainer?: boolean;
  includeFooter?: boolean;
}> = ({ children, withContainer = true, includeFooter = true }) => {
  return (
    <>
      <Head>
        <title>Ether.fi - Web3 Task Challenge</title>
        <meta name="description" content="Ether.fi - Web3 Task Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />

      <Flex
        bg="linear-gradient(55.05deg,#19163b 56.3%,#783f53 107.97%,#ed7171 128.41%)"
        overflow="hidden"
        display="flex"
        flexDir="column"
      >
        {withContainer ? (
          <Container height="full" maxW={["container.md", "container.lg"]}>
            {children}
          </Container>
        ) : (
          children
        )}
      </Flex>
    </>
  );
};
