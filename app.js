require('dotenv').config()

const express = require('express');
const port = process.env.PORT || 3000;
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());


var Nexmo = require('nexmo');

var nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET,
    applicationId: process.env.NEXMO_APP_ID,
    privateKey: process.env.NEXMO_PRIVATE_KEY,
});

app.use(bodyParser.json({
    type: 'application/json'
}));

app.all('/sms', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    var text = req.query.text;
    var from = req.query.msisdn;
    

    res.sendStatus(200);
})

// function storeMessage(from, text) {
//     var session = {};
//     var newLead = true;

//     sessions.forEach((session, index) => {
//         if (from === session.num) {
//             newLead = false
//         }
//     })

//     if (newLead) {
//         session = {
//             "num": from,
//             "text": text
//         }
//     }

//     sessions.push(session);
// }

// function getSession(from) {
//     return new Promise((resolve, reject) => {
//         sessions.forEach((session) => {
//             console.log("SESSION: ", session, "from: ", from)
//             if (from === session.num) {
//                 console.log("GOT SESSION: ", session);
//                 resolve(session)
//             }
//         })
//     })
// }

// Start server
app.listen(port, () => {
    console.log('Express server started on port ' + port);
})