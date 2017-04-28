var kardashians = require('../data/kardashians.js');
var newFriends = require('../data/newFriends.js');

module.exports = function(app) {
    // display kardashians data in json format
    app.get('/api/friends', function(req, res) {
            res.json(kardashians);
        })
        // display new-friends data in json format
    app.get('/api/new-friends', function(req, res) {
            res.json(newFriends);
        })
        // process and return data when a post request is made
    app.post('/api/new-friends', function(req, res) {

        // variables hold best match values
        var matchDifference = 50;
        var tempDifference = 0;
        var matchName;
        var matchImg;

        // loop through all kardashian objects
        for (var i = 0; i < kardashians.length; i++) {
            // loop through each objects scores and compare them against user's scores
            for (var j = 0; j < kardashians[i].scores.length; j++) {
                // individual score values
                var newFriendScores = parseInt(req.body["scores[]"][j]);
                var kardashianScores = kardashians[i].scores[j];

                // conditional statment avoids negative numbers and compres differences in scores between objects
                if (newFriendScores > kardashianScores) {
                    tempDifference += (newFriendScores - kardashianScores);
                } else if (newFriendScores < kardashianScores) {
                    tempDifference += (kardashianScores - newFriendScores);
                } else if (newFriendScores === kardashianScores) {
                    tempDifference += 0;
                }
            }

            // if diifference between objects is less than the previous match replace values with new match values
            if (tempDifference < matchDifference) {
                matchDifference = tempDifference;
                matchName = kardashians[i].name
                matchImg = kardashians[i].photo
            }

            // reset tempDifference for next match
            tempDifference = 0;
        }

        // create match object
        var matchData = {
            name: matchName,
            photo: matchImg,
        }

        // push new friend to newFriends array
        newFriends.push(req.body);
        // send match object as response
        res.json(matchData)
    })
}
