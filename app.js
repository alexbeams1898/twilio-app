/* REQUIRE STATEMENTS */
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const app = express(); // express object

/* MY TWILIO ACCOUNT INFO FOR USING THE API */
var accountSid = "AC81e5db08492c762a3ff114f5a633614f";
var authToken = "0327f1092a4860a4a2574d71cb006c75";

/* CREATE NEW TWILIO OBJECT */
var client = new twilio(accountSid, authToken);

/* USES THE INDEX.EJS FILE AS A VIEW */
app.use(express.static("public"));
app.set("view engine", "ejs");

/* LOADS THE PAGE */
app.get("/", function(req, res) {
  res.render("index");
});

app.use(bodyParser.urlencoded({ extended: true }));
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

app.listen(3000);

// Test Numbers: +15185011128 +15184918838
