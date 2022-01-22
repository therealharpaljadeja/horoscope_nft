import {
	Heading,
	Text,
	VStack,
	Button,
	FormControl,
	FormLabel,
	Input,
	Tag,
	HStack,
	Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Contract, providers } from "ethers";
import NFT from "./abi/NFT.json";

const NFT_CONTRACT_ADDRESS = "0xa8832d65a1869f78BD849aFDc60967f9d66fFaEF";

function App() {
	// state to keep track whether the user has installed wallet or not.
	const [isWalletInstalled, setIsWalletInstalled] = useState(false);
	const [date, setDate] = useState("1970-01-01");

	// state for zodiacSign derived from date.
	const [zodiacSign, setZodiacSign] = useState(null);

	// state for keeping track of current connected account.
	const [account, setAccount] = useState(null);

	// state for whether app is minting or not.
	const [isMinting, setIsMinting] = useState(false);

	const [NFTContract, setNFTContract] = useState(null);

	useEffect(() => {
		calculateZodiacSign(date);
	}, [date]);

	useEffect(() => {
		if (window.ethereum) {
			setIsWalletInstalled(true);
		}
	}, []);

	useEffect(() => {
		function initNFTContract() {
			const provider = new providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			setNFTContract(new Contract(NFT_CONTRACT_ADDRESS, NFT.abi, signer));
		}
		initNFTContract();
	}, [account]);

	async function mintNFT() {
		setIsMinting(true);
		try {
			await NFTContract.mintNFT(account, zodiacSign);
		} catch (e) {
		} finally {
			setIsMinting(false);
		}
	}

	async function connectWallet() {
		window.ethereum
			.request({
				method: "eth_requestAccounts",
			})
			.then((accounts) => {
				setAccount(accounts[0]);
			})
			.catch((error) => {
				alert("Something went wrong");
			});
	}

	function handleDateInput({ target }) {
		setDate(target.value);
	}

	function calculateZodiacSign(date) {
		let dateObject = new Date(date);
		let day = dateObject.getDate();
		let month = dateObject.getMonth();
		if (month == 0) {
			if (day >= 20) {
				setZodiacSign("Aquarius");
			} else {
				setZodiacSign("Capricorn");
			}
		} else if (month == 1) {
			if (day >= 19) {
				setZodiacSign("Pisces");
			} else {
				setZodiacSign("Aquarius");
			}
		} else if (month == 2) {
			if (day >= 21) {
				setZodiacSign("Aries");
			} else {
				setZodiacSign("Pisces");
			}
		} else if (month == 3) {
			if (day >= 20) {
				setZodiacSign("Taurus");
			} else {
				setZodiacSign("Aries");
			}
		} else if (month == 4) {
			if (day >= 21) {
				setZodiacSign("Gemini");
			} else {
				setZodiacSign("Taurus");
			}
		} else if (month == 5) {
			if (day >= 21) {
				setZodiacSign("Cancer");
			} else {
				setZodiacSign("Gemini");
			}
		} else if (month == 6) {
			if (day >= 23) {
				setZodiacSign("Leo");
			} else {
				setZodiacSign("Cancer");
			}
		} else if (month == 7) {
			if (day >= 23) {
				setZodiacSign("Virgo");
			} else {
				setZodiacSign("Cancer");
			}
		} else if (month == 8) {
			if (day >= 23) {
				setZodiacSign("Libra");
			} else {
				setZodiacSign("Virgo");
			}
		} else if (month == 9) {
			if (day >= 23) {
				setZodiacSign("Scorpio");
			} else {
				setZodiacSign("Libra");
			}
		} else if (month == 10) {
			if (day >= 22) {
				setZodiacSign("Sagittarius");
			} else {
				setZodiacSign("Scorpio");
			}
		} else if (month == 11) {
			if (day >= 22) {
				setZodiacSign("Capricorn");
			} else {
				setZodiacSign("Sagittarius");
			}
		}
	}

	if (account === null) {
		return (
			<VStack
				alignItems="center"
				justifyContent="center"
				width="100vw"
				height="100vh"
				className="App"
				spacing={5}
			>
				<Heading>Horoscope NFT</Heading>
				<Text>Mint a Zodiac Sign NFT based on your Birthdate.</Text>

				{isWalletInstalled ? (
					<Button onClick={connectWallet}>Connect Wallet</Button>
				) : (
					<Tag>Install Metamask wallet</Tag>
				)}
			</VStack>
		);
	}

	return (
		<VStack
			alignItems="center"
			padding="100px"
			justifyContent="center"
			className="App"
		>
			<HStack alignItems="flex-start" spacing="200px">
				<VStack alignItems="flex-start" spacing={5}>
					<Heading>Horoscope NFT</Heading>
					<Text>Mint a Zodiac Sign NFT based on your Birthdate.</Text>
					<Tag>Connected as: {account}</Tag>
					<FormControl>
						<VStack>
							<FormLabel htmlFor="dob">Date of Birth</FormLabel>
							<Input
								onChange={handleDateInput}
								value={date}
								type="date"
								id="dob"
							/>
						</VStack>
					</FormControl>
					<Button isLoading={isMinting} onClick={mintNFT}>
						Mint NFT
					</Button>
				</VStack>
				{zodiacSign ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMinYMin meet"
						viewBox="0 0 300 300"
						width="400px"
						height="400px"
					>
						<style>{`.base { fill: white; font-family: serif; font-size: 24px;`}</style>
						<rect width="100%" height="100%" fill="black" />
						<text
							x="50%"
							y="50%"
							class="base"
							dominant-baseline="middle"
							text-anchor="middle"
						>
							{zodiacSign}
						</text>
					</svg>
				) : null}
			</HStack>
		</VStack>
	);
}

export default App;
