let internetAvailable = require("internet-available");

internetAvailable({
    domainName: 'baidu.com',
    host: '114.114.114.114',
    timeout: 5000,
    retries: 5
}).then(() => {
    console.log("Internet available");
}).catch(() => {
    console.log("Internet unavailable");
});
