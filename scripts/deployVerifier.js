const hre = require("hardhat");

async function main() {
    const verifier = await ethers.getContractFactory("Halo2Verifier");

    const myVerifier = await verifier.deploy();
    console.log("Contract deployed to address:", myVerifier.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})