import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xE3f09C2C407D5Dff0B9B7669BCa549B0b69177Ad'
);

export default instance;
