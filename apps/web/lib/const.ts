export const CHAIN_ID = 31337;

export const isServer = () => typeof window === "undefined" ? false : true;
