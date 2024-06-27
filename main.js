const SHA256 = require('crypto-js/sha256')


class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}


class Block{
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}


class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block('6/25/2025', 'Genesis block', '0')
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    /*
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        //newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    */

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!')
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward) 
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }


    getBalanceOfAddress(address) {
        let balance = 0;

        for(const block of this.chain) {
            //console.log((block))
            for(const trans of block.transactions) {
                if(trans.fromAddress === address) {
                    //console.log(trans.amount)
                    balance -= trans.amount;
                }

                if(trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            console.log(previousBlock)
            console.log(currentBlock)
            //console.log(currentBlock.hash)


            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

        }

        return true;
    }

}

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

