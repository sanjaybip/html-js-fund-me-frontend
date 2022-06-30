import { ethers } from "./lib/ethers-5.2.esm.min.js";
import { contractAddress, abi } from "./lib/constants.js";
const connectBtn = document.getElementById("connectButton");
const fundBtn = document.getElementById("fundButton");
const getBalance = document.getElementById("getBal");
const withdrawFund = document.getElementById("withdraw");
const ethInput = document.getElementById("ethAmount");
connectBtn.onclick = connect;
fundBtn.onclick = fund;
getBalance.onclick = getEthBalance;
withdrawFund.onclick = withdraw;
console.log(ethers);
async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
        }
        catch (e) {
            console.log(e);
        }
        connectBtn.innerHTML = "Connected";
    }
    else {
        connectBtn.innerHTML = "Install Metamask";
    }
}
async function fund() {
    if (typeof window.ethereum !== "undefined") {
        const ethAmount = ethInput.value;
        console.log(`Funding with ${ethAmount} ETH...`);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const transactionResp = await contract.Fund({
                value: ethers.utils.parseEther(ethAmount),
            });
            await listenForTransactionMine(transactionResp, provider);
            console.log(`Funded successfully!`);
        }
        catch (e) {
            console.log(e);
        }
    }
    else {
        connectBtn.innerHTML = "Install Metamask";
    }
}
async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        console.log(`Withdrawing funds...`);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const transactionResp = await contract.withdraw();
            await listenForTransactionMine(transactionResp, provider);
            console.log(`Withdraw successful`);
        }
        catch (e) {
            console.log(e);
        }
    }
    else {
        connectBtn.innerHTML = "Install Metamask";
    }
}
async function getEthBalance() {
    if (typeof window.ethereum !== "undefined") {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const ethBalance = await provider.getBalance(contractAddress);
            console.log(`current ETH balance is ${ethers.utils.formatEther(ethBalance)}`);
        }
        catch (e) {
            console.log(e);
        }
    }
    else {
        connectBtn.innerHTML = "Install Metamask";
    }
}
function listenForTransactionMine(transactionResp, provider) {
    console.log(`Mining ${transactionResp.hash}`);
    return new Promise((resolve, reject) => {
        provider.once(transactionResp.hash, (transactionReceipt) => {
            console.log(`Completed with ${transactionReceipt.confirmations} confirmations`);
            resolve();
        });
    });
}
