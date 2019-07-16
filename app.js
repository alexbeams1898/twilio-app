const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const app = express();

var accountSid = "AC81e5db08492c762a3ff114f5a633614f";
var authToken = "0327f1092a4860a4a2574d71cb006c75";
var client = new twilio(accountSid, authToken);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index");
});

app.post("/", function(req, res) {
  let toNumber = req.body.toNumber;
  let fromNumber = req.body.fromNumber;
  let message = req.body.message;

  client.messages.create({
    body: message,
    to: toNumber,
    from: fromNumber
  });
  res.render("index");
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

// var accountSid = "AC81e5db08492c762a3ff114f5a633614f";
// var authToken = "0327f1092a4860a4a2574d71cb006c75";

// var twilio = require("twilio");
// var client = new twilio(accountSid, authToken);

// client.messages
//   .create({
//     body: "Hello from Node",
//     to: "+15184918838", // Text this number
//     from: "+15185011128" // From a valid Twilio number
//   })
//   .then(message => console.log(message.sid));
