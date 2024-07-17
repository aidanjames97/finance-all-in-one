function StockInfo() {
    const finnhub = require('finnhub');

    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "cqajf41r01qjmbik6lfgcqajf41r01qjmbik6lg0" // Replace this
    const finnhubClient = new finnhub.DefaultApi()

    
}
export default StockInfo