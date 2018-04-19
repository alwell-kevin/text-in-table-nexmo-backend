require('dotenv').config()

const express = require('express');
const port = process.env.PORT || 3000;
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
var sessions = [];
var nexmo = require("./nexmo");

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

    getSession(from, text).then((session) => {
        if (session.new) {
            sessions.push(session)

            console.log("SENDING NEW SESSION RESP", session.num, session.response);
            nexmo.sendResponse(session.num, session.response);
        }
    })

    res.sendStatus(200);
})

//TODO: DIFFERENTIATE VERTICAL AND TEXT
function getSession(from, text) {
    console.log("GETTING SESSION: ", from);

    return new Promise((resolve, reject) => {
        sessions.forEach((session) => {
            console.log("FOUND LIVE SESSION: ", session, "from: ", from)
            if (from === session.num) {

                switch (session.step) {
                    case 0:
                        session.new = false;
                        session.vertical = text;
                        session.step = 1
                        session.response = "Please enter your novel idea.";
                        nexmo.sendResponse(session.num, session.response);
                        break;
                    case 1:
                        session.message = text;
                        session.step = 2
                        session.response = "The board will update shortly. Thanks for choosing Nexmo! ";
                        nexmo.sendResponse(session.num, session.response);
                        break;
                    case 2:
                        session.message = "";
                        session.vertical = "";
                        session.step = 0;
                        session.response = "Please enter a vertical";
                        nexmo.sendResponse(session.num, session.response);
                        break;
                }

                console.log("GOT SESSION: ", session);
                session.message = text;
                resolve(session)
            }
        })

        console.log("CREATING NEW SESSION: ", from)
        resolve({
            "num": from,
            "vertical": text,
            "message": text,
            "response": "Please enter a vertical",
            "step": 0,
            "new": true
        })

        reject("error")
    })
}

app.get("/sessions", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    console.log("RETURNING SESSIONS ARRAY: ", sessions);

    res.json(sessions);
})

// Start server
app.listen(port, () => {
    console.log('Express server started on port ' + port);
})