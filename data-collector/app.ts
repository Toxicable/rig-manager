import { LocalBitCoinsData } from './models/localbitcoins';
import { Coin } from './models/what-to-mine';
import * as http from 'http';
import * as rp from 'request-promise-native';
import * as admin from 'firebase-admin'

var serviceAccount = require("./rig-monitor-594db-firebase-adminsdk-je7b4-12b2fb281b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rig-monitor-594db.firebaseio.com"
});

const  database = admin.database();
const externalData = database.ref('/external-data')



const sources = {
  localBitcoins: {
    url: 'https://localbitcoins.com/sell-bitcoins-online/nz/new-zealand/national-bank-transfer/.json',
    ref: database.ref('/external-data/localbitcoins')
  },
  whattomine: {
    url: 'https://whattomine.com/coins.json',
    ref: database.ref('/external-data/whattomine')
  }
}

function getWhattomine(){
  return rp(sources.whattomine.url).then(json => {
    var coins: {[key: string]: Coin} = JSON.parse(json).coins;
    var transformed = Object.keys(coins).map(name => {
      const coin = coins[name];
      return {
        name,
        exchangeRate: coin.exchange_rate,
        profitablity: coin.profitability,
        tag: coin.tag,
        blockReward: coin.block_reward,
        blockTime: coin.block_time,
        networkHashrate: coin.nethash,
        algo: coin.algorithm
      }
    })
    transformed = transformed.filter(coin => !coin.name.toLowerCase().includes("nicehash"))
    return sources.whattomine.ref.set(transformed);
  })
}

function getLocalbitcoins(){
  return rp(sources.localBitcoins.url).then(json => {
    const rawData: LocalBitCoinsData = JSON.parse(json);
    const data = rawData.data.ad_list;
    const transformed = data.map(ad => {
      return {
        url: ad.actions.public_view,
        price: ad.data.temp_price,
        min: ad.data.min_amount,
        max: ad.data.max_amount
      }
    })
    return sources.localBitcoins.ref.set(transformed);
  })
}

function refreshData(){
  getWhattomine().then();
  getLocalbitcoins().then();

}

var interval = setInterval(() => {
  refreshData();
}, 10000)
refreshData();
// http.createServer(function (request, response) {
//   response.writeHead(200, { 'Content-Type': 'text/plain' });
//   response.end('You\'re not really meant to be here');
// }).listen(8080);
