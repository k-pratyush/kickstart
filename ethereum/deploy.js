require('dotenv').config({ path: './config.env' });
const compiledFactory = require('./build/CampaignFactory.json');

const HDWallerProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const provider = new HDWallerProvider(process.env.WALLET_MNEMONIC, process.env.INFURA_API)
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from: ', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
                .deploy({ data: compiledFactory.bytecode })
                .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to: ', result.options.address);
    provider.engine.stop();
};
deploy();
