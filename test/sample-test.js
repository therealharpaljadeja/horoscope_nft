const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT", function () {
	it("Should mint nft using the provided", async function () {
		const NFT = await ethers.getContractFactory("NFT");
		const nft = await NFT.deploy();
		await nft.deployed();

		// get the signer's address to mint nft to.
		const signers = await ethers.getSigners();
		const firstSigner = signers[0];

		// minting nft
		await nft.mintNFT(
			firstSigner.address,
			"https://www.reuters.com/resizer/KPyPEIt3l_uuN0830xaFD9v2Idc=/1920x2400/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/34GWN2I7W5LJJDYR7VOOLE7MLY.jpg"
		);

		// checking if the tokenURI matches with the one passed in.
		expect(await nft.tokenURI(1)).to.equal(
			"https://www.reuters.com/resizer/KPyPEIt3l_uuN0830xaFD9v2Idc=/1920x2400/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/34GWN2I7W5LJJDYR7VOOLE7MLY.jpg"
		);
	});
});
