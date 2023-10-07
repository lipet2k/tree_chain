require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({ path: __dirname + '/.env' });

require('@vechain/hardhat-vechain');
require('@vechain/hardhat-ethers');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "vechain",
  networks: {
    vechain: {
      url: "https://testnet.veblocks.net/",
      accounts: {
        mnemonic: process.env.PRIVATE_MNEMONIC,
      }
    },
  }
};
