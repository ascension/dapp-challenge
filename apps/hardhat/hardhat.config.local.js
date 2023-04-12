/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.18",
  networks: {
    localhost: {
      chainId: 31337,
    },
    render: {
      url: "https://hardhat-rbl2.onrender.com",
      chainId: 31337,
    },
  },
};
