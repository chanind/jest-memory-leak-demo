const express = require("express");
const geoip = require("geoip-lite");

// just requiring sentry, not even initializing or using it
require("@sentry/node");

// big-ish file (7 MB)
const enWords = require("./enWords.json");

const app = express();
app.enable("trust proxy");

app.get("/", (req, res) => {
  res.send("Hello!");
});

// return location info about the current user based on their IP
app.get("/ip-to-loc", (req, res) => {
  const ipInfo = geoip.lookup(req.ip);
  res.json(ipInfo || { error: "no ip found" });
});

// return word frequency info based on enWords.json
app.get("/word-freq/:word", (req, res) => {
  res.json({
    word: req.params.word,
    frequency: enWords[req.params.word] || 0
  });
});

module.exports = app;
