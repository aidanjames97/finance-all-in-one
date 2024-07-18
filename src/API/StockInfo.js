import { key } from "./api"

const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = key // Replace this
const finnhubClient = new finnhub.DefaultApi()

export { finnhubClient }