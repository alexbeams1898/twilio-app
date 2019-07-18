/* REQUIRE STATEMENTS */
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const app = express(); // express object

/* MY TWILIO ACCOUNT INFO FOR USING THE API/TWILIO NUMBER */
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

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
  let message = req.body.message;

  console.log(toNumber);
  client.messages.create({
    body: message,
    to: toNumber,
    from: +15185011128
  });

  res.redirect("/");
});

app.listen(3000);

// Test Numbers: +15185011128 +15184918838
