require('dotenv').config()
var Nexmo = require('nexmo');

var nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET,
    applicationId: process.env.NEXMO_APP_ID
});

const sendResponse = (num, msg) => {
    console.log("SENDING TEXT from: ", process.env.NEXMO_NUMBER, "to: ", num, "msg: ", msg);

    setTimeout(function () {
        nexmo.message.sendSms(process.env.NEXMO_NUMBER, num, msg, function (err, httpResp, body) {
            if (err) {
                console.log("sendMessagesThroughNexmo couldn't send request. error: " + err);
            } else {
                console.log("message sent through nexmo");
            }
        })
    }, 1500);
}

module.exports.sendResponse = sendResponse;