require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: "0.8.4",
	networks: {
		rinkeby: {
			url: "https://rinkeby.infura.io/v3/c9a1705dea9d47398f058afd2aeabe7b",
			accounts: [
				"61f1cc39ede8e3d5f357d2c0b8992328f0552f74719903cca17d993d1ad475b2",
			],
		},
	},
};
