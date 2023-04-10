import React from "react";
import { Box, Container, Flex, Link, Stack } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";

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
        <Box as="footer" bg="#110e35" color="white" py={8}>
          <Container maxW={["container.md", "container.lg"]}>Stuff</Container>
        </Box>
      </Flex>
    </>
  );
};
