import { key } from "./api"

// const BASE_URL = "https://finnhub.io/api/v1/quote?symbol=";
// const KEY_URL = `&token=${key}`;

const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = key // Replace this
const finnhubClient = new finnhub.DefaultApi()

export { finnhubClient }