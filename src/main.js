const {Blockchain, Transaction} = require('./blockchain')

let newCoin = new Blockchain();

newCoin.createTransaction(new Transaction('address1', 'address2', 100));
newCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...')
newCoin.minePendingTransactions('miner1-address');

console.log('\nBalance of miner1-address is ', newCoin.getBalanceOfAddress('miner1-address'));


//console.log('Mining block 1...')
//newCoin.addBlock(new Block(1, '6/25/2025', {amount: 4}));
//console.log('Mining block 2...')
//newCoin.addBlock(new Block(2, '6/25/2025', {amount: 10}));
//console.log(JSON.stringify(newCoin, null, 4));
//console.log(newCoin);
//console.log(newCoin.chain[0].hash)
//console.log(newCoin.chain[1].hash)
//console.log('Is blockchain valid? ' + newCoin.isChainValid());

