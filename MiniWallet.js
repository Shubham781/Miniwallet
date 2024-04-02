require('dotenv').config();

const { Web3 } = require('web3');

// For web3(v4.x), you have to import it by:
// const { Web3 } = require('web3');

// for web3(v1.x) or older:
// const Web3 = require('web3');

const apikey = process.env['apikey'];
const network = 'holesky';
const node = `https://go.getblock.io/${apikey}/${network}/`;

const web3 = new Web3(node);

// console.log(web3);

const accountTo = web3.eth.accounts.create();
// console.log(accountTo);

const privatekey = process.env['privatekey'];
const accountFrom = web3.eth.accounts.privateKeyToAccount(privatekey);
console.log(accountFrom);

const createSignedTx = async(rawTx)=>{
    rawTx.gas = await web3.eth.estimateGas(rawTx);
    return await accountFrom.signTransaction(rawTx);
}

// const sendSignedTx = async(signedTx)={
//      web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log);
// }
const sendSignedTx = async (signedTx) => {
  return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
}; 

const amountTo = "0.01";

const rawTx = {
    to:accountTo.address,
    value:web3.utils.toWei(amountTo,"ether")
}
createSignedTx(rawTx).then(sendSignedTx).then(console.log);