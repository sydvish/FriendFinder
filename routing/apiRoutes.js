const Router = require("express").Router;
const app = Router();
var friends = require("../app/data/friends");

module.exports = function (app) {

    app.get("/api/survey", function (req, res) {
        return res.json(friends);
    });

    app.post("/api/survey", function (req, res) {


        var totalDifference = 0;
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000,
        };

        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;

        var b = userScores.map(function (item) {
            return parseInt(item, 10);
        });
        userData = {
            name: req.body.name,
            photo: req.body.photo,
            scores: b
        };
        console.log("Name " + userName);
        console.log("User score " + userScores);
        var sum = b.reduce((a, b) => a + b, 0);
        console.log("Sum of users score " + sum);
        console.log("Best match friend diff " + bestMatch.friendDifference);
        console.log("+++++++++++++++++++++++++++++++++++++++++++++");

        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i].name);
            totalDifference = 0;
            console.log("Total Diff " + totalDifference);
            console.log("Best match friend diff " + bestMatch.friendDifference);

            var bfriendScore = friends[i].scores
                .map((item) => parseInt(item, 10))
                .reduce((a, b) => a + b, 0);
            console.log("Total friend score " + bfriendScore);
            totalDifference += Math.abs(sum - bfriendScore);
            console.log("----------------------------------------> " + totalDifference);

            if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDifference;
            }
            console.log(totalDifference + " Total Difference ");
        }
        console.log(userData);

        friends.push(userData);

        res.json(bestMatch);


        console.log(bestMatch);
    });




}

