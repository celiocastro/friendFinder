var express = require("express");
var path = require("path");
var fs = require("fs");

var router = express.Router();

router.get("/friends", function (req, res) {
    res.sendFile(path.join(__dirname, "../data/friends.js"));
});

router.post("/friends", function (req, res) {
    console.log(req.body.name);
    console.log(req.body.photo);
    fs.readFile(path.join(__dirname, "../data/friends.js"), "utf8", function (err, data) {
        var minDiff;
        var bestMatch;
        JSON.parse(data).forEach((friend) => {
            var diff = 0;
            friend.scores.forEach((score, i) => {
                diff += Math.abs(parseInt(score) - (parseInt(req.body.scores[i]) || 0));
            });
            if (typeof minDiff === "undefined" || minDiff > diff) {
                bestMatch = friend;
                minDiff = diff;
            }
        });
        const currFriends = JSON.parse(data);
        currFriends.push(req.body);
        fs.writeFileSync(path.join(__dirname, "../data/friends.js"), JSON.stringify(currFriends), 'utf8');
        res.json({ name: bestMatch.name, photo: bestMatch.photo });
    });   
});

module.exports = router;