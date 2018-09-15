var express = require("express");
var path = require("path");

var router = express.Router();

router.get("/", function (req, res) {
    res.redirect("/home.html");
});

router.get("/survey", function (req, res) {
    res.redirect("/survey.html");
});

module.exports = router;