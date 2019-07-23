/* GET dotenv INFO */
require("dotenv").config();
const authyKey = process.env.TWILIO_AUTHY_API_KEY;

/* REQUIRE STATEMENTS */
const express = require("express");
const bodyParser = require("body-parser");
const app = express(); // express object
const authy = require("authy")(authyKey);

/* GETS THE PHONE NUMBER FROM THE FORM */
app.use(bodyParser.urlencoded({ extended: true }));

/* USES THE INDEX.EJS FILE AS A VIEW */
app.use(express.static("public"));
app.set("view engine", "ejs");

/* LOAD PAGES */

//Loads index.ejs
app.get("/", (req, res) => {
  res.render("index");
});
//Loads verify.ejs
app.get("/verify", (req, res) => {
  res.render("verify");
});
//Loads success.ejs
app.get("/success", (req, res) => {
  res.render("success");
});
//Loads failure.ejs
app.get("/failure", (req, res) => {
  res.render("failure");
});

var toNumber;
var countryCode;
var phoneNumber;

/* ACTION AFTER THE 'SEND' BUTTON IS PRESSED (SENDS MESSAGE) */
app.post("/enter-number", function(req, res) {
  toNumber = req.body.toNumber;
  countryCode = toNumber[1];
  phoneNumber = toNumber.substring(2, toNumber.length);

  // Code that sends you a verification number
  authy
    .phones()
    .verification_start(phoneNumber, countryCode, "sms", function(err, res) {
      if (err) {
        console.log(err);
      }
    });
  res.redirect("/verify");
});

app.post("/enter-ver-number", function(req, res) {
  var resInstance = res;
  let verificationNumber = req.body.verNumber;
  authy
    .phones()
    .verification_check(phoneNumber, countryCode, verificationNumber, function(
      err,
      res
    ) {
      if (err) {
        // invalid token
        resInstance.redirect("/failure");
      }
      if (res) {
        resInstance.redirect("/success");
      }
    });
});

app.listen(3000);
