# HTML/TypeScript Frontend

This is minimum front-end website designed to interect with [Hardhat Fund Me](https://github.com/sanjaydefidev/hardhat-fund-me) Smart Contract.

The `Hardhat Fund Me` smart contract runs on loclhost blockchain and we use `metamask` to interact with it.

The front-end has following UI to intereact with smart contract

## 1. Connect

A button to connect to blockchain through metamask.

## 2. Fund

A Fund button to fund the contracts with input `ETH` value in the text box.

## 3. Balance

A Balance button to check the funded amount so far in our contract address.

## 4. Withdraw Funds

A button to withdraw all funds from `Fund Me` contract.

# How to use it?

To run and test the code in your local development machine copy the repo with following command. We have used `yarn` package manager. You can use `NPM`.

```shell
git clone https://github.com/sanjaydefidev/html-js-fund-me-frontend
```

Since we are using `TypeScript`. You shoud run the following command.

```shell
yarn install
```

We have also used `vscode` [Go Live](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension to run a local `http server` so that we can test our html-js frontend locally.

Make sure you have [Hardhat Fund Me](https://github.com/sanjaydefidev/hardhat-fund-me) on your local machine and to run a local hardhat newtork use following command from the root of `Hardhat Fund Me` project folder.

```shell
yarn hardhat node
```

---

For futher detail of this tutorial [check this link](https://github.com/PatrickAlphaC/html-fund-me-fcc).

**Special Note:**

Thank you @PatrickAlphaC for creating such and awesome tutorial.
