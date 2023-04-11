import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { providers } from "ethers";
import { InjectedConnector } from "wagmi/connectors/injected";
import { hardhat } from "wagmi/chains";
import { createClient, WagmiConfig } from "wagmi";
import { CHAIN_ID } from "../lib/const";

const ethProvider = new providers.JsonRpcProvider(
  "http://127.0.0.1:8545",
  providers.getNetwork(CHAIN_ID)
);
const connector = new InjectedConnector({ chains: [hardhat] });

const client = createClient({
  autoConnect: false,
  provider: ethProvider,
  connectors: [connector],
});

const theme = extendTheme({
  styles: {
    global: {
      html: {
        "background-color": "#110e35",
      },
      body: {
        background:
          "linear-gradient(55.05deg,#19163b 56.3%,#783f53 107.97%,#ed7171 128.41%)",
      },
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default App;
