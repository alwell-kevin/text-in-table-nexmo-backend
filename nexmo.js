var Nexmo = require('nexmo');

var nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET,
    applicationId: process.env.NEXMO_APP_ID
});

const sendResponse = (num, msg) => {
    nexmo.message.sendSms(process.env.NEXMO_FROM, num, msg, function (err, httpResp, body) {
        if (err) {
            console.log("sendMessagesThroughNexmo couldn't send request. error: " + err);
            reject(err);
        } else {
            console.log("message sent through nexmo");
            resolve(200);
        }
    })
}

module.exports.sendResponse = sendResponse;