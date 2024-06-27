const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();
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
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(0, '6/25/2025', 'Genesis block', '0')
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        //newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
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
console.log('Mining block 1...')
newCoin.addBlock(new Block(1, '6/25/2025', {amount: 4}));
console.log('Mining block 2...')
newCoin.addBlock(new Block(2, '6/25/2025', {amount: 10}));
//console.log(JSON.stringify(newCoin, null, 4));
console.log(newCoin);
//console.log(newCoin.chain[0].hash)
//console.log(newCoin.chain[1].hash)
//console.log('Is blockchain valid? ' + newCoin.isChainValid());

