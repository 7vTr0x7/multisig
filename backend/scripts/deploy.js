const hre = require("hardhat");

async function main() {

  const MultiSig = await hre.ethers.getContractFactory("MultiSigWallet");
  const multiSig = await MultiSig.deploy();

  await multiSig.deployed();

  console.log(
    `multiSig deployed to ${multiSig.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
