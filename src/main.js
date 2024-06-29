const {Blockchain, Transaction} = require('./blockchain')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('ff976c0fc13c4a05af94087b0e917d9ce1e36daabe0456b80c7f7a82b5394696')
const myWalletAddress = myKey.getPublic('hex')

let newCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
newCoin.addTransaction(tx1);



//newCoin.createTransaction(new Transaction('address1', 'address2', 100));
//newCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...')
newCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of miner1-address is ', newCoin.getBalanceOfAddress(myWalletAddress));


//console.log('Mining block 1...')
//newCoin.addBlock(new Block(1, '6/25/2025', {amount: 4}));
//console.log('Mining block 2...')
//newCoin.addBlock(new Block(2, '6/25/2025', {amount: 10}));
//console.log(JSON.stringify(newCoin, null, 4));
//console.log(newCoin);
//console.log(newCoin.chain[0].hash)
//console.log(newCoin.chain[1].hash)
//console.log('Is blockchain valid? ' + newCoin.isChainValid());

