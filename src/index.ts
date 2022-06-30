import { ethers } from "./lib/ethers-5.2.esm.min.js";
import { contractAddress, abi } from "./lib/constants.js";

const connectBtn = document.getElementById(
    "connectButton"
) as HTMLButtonElement;
const fundBtn = document.getElementById("fundButton") as HTMLButtonElement;
const getBalance = document.getElementById("getBal") as HTMLButtonElement;
const withdrawFund = document.getElementById("withdraw") as HTMLButtonElement;
const ethInput = document.getElementById("ethAmount") as HTMLInputElement;
connectBtn.onclick = connect;
fundBtn.onclick = fund;
getBalance.onclick = getEthBalance;
withdrawFund.onclick = withdraw;

console.log(ethers);

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (e) {
            console.log(e);
        }
        connectBtn.innerHTML = "Connected";
    } else {
        connectBtn.innerHTML = "Install Metamask";
    }
}

async function fund() {
    if (typeof window.ethereum !== "undefined") {
        const ethAmount = ethInput.value;
        console.log(`Funding with ${ethAmount} ETH...`);
        // To interact with smart contract we need folloiwng things. With all these we can make any transactions.
        // 1. Provider - connection to blockchain
        // 2. Signer - wallet of user to interact with gas
        // 3. Contract - The contract we are ineracting with. To get the it you need ABI and Contract Address.
        const provider = new ethers.providers.Web3Provider(window.ethereum); //this code basically connect with metamask thru https/http endpoint for different operation
        const signer = provider.getSigner(); //this return whatever wallet is connected from the provider. If we are connected with account 1 in metamask, it will return address of account 1.

        const contract: any = new ethers.Contract(contractAddress, abi, signer);
        try {
            const transactionResp = await contract.Fund({
                value: ethers.utils.parseEther(ethAmount),
            });
            // We need to listen this transaction so that we can update the frontend for our users. There are 2 ways of doing it.
            // 1. Listen to a transaction to me mined
            // 2. Listen to an event (Will be learning in later tutorials)
            // Using option 1. Listening to transaction mined
            await listenForTransactionMine(transactionResp, provider);
            console.log(`Funded successfully!`);
        } catch (e) {
            console.log(e);
        }
        //console.log(signer);
    } else {
        connectBtn.innerHTML = "Install Metamask";
    }
}

async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        console.log(`Withdrawing funds...`);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract: any = new ethers.Contract(contractAddress, abi, signer);
        try {
            const transactionResp = await contract.withdraw();
            await listenForTransactionMine(transactionResp, provider);
            console.log(`Withdraw successful`);
        } catch (e) {
            console.log(e);
        }
    } else {
        connectBtn.innerHTML = "Install Metamask";
    }
}

async function getEthBalance() {
    if (typeof window.ethereum !== "undefined") {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const ethBalance = await provider.getBalance(contractAddress);
            console.log(
                `current ETH balance is ${ethers.utils.formatEther(ethBalance)}`
            );
        } catch (e) {
            console.log(e);
        }
    } else {
        connectBtn.innerHTML = "Install Metamask";
    }
}

function listenForTransactionMine(transactionResp: any, provider: any) {
    console.log(`Mining ${transactionResp.hash}`);
    //now we will create a promise, because we need a listener to the blockchain.
    //Promise only return once resolve or reject is called.
    return new Promise<void>((resolve, reject) => {
        //Listen to this transaction to finish
        provider.once(transactionResp.hash, (transactionReceipt: any) => {
            console.log(
                `Completed with ${transactionReceipt.confirmations} confirmations`
            );
            resolve();
        });
    });
}
