/* MY TWILIO ACCOUNT INFO FOR USING THE API/TWILIO NUMBER */
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const authyKey = process.env.TWILIO_AUTHY_API_KEY;

/* REQUIRE STATEMENTS */
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const app = express(); // express object
const authy = require("authy")(authyKey);

/* CREATE NEW TWILIO OBJECT */
var client = new twilio(accountSid, authToken);

/* USES THE INDEX.EJS FILE AS A VIEW */
app.use(express.static("public"));
app.set("view engine", "ejs");

/* LOADS THE PAGE */
app.get("/", function(req, res) {
  res.render("index");
});

/* GETS THE PHONE NUMBER AND MESSAGE FROM THE FORM */
app.use(bodyParser.urlencoded({ extended: true }));

/* ACTION AFTER THE 'SEND' BUTTON IS PRESSED (SENDS MESSAGE) */
app.post("/", function(req, res) {
  let toNumber = req.body.toNumber;
  let countryCode = toNumber[1];
  let phoneNumber = toNumber.substring(2, toNumber.length);

  // Code that sends you a verification number
  authy
    .phones()
    .verification_start(phoneNumber, countryCode, "sms", function(err, res) {
      if (err) {
        console.log(err);
      }
    });

  res.redirect("/");
});

app.listen(3000);
