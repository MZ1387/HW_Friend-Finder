var kardashians = require('../data/kardashians.js');
var newFriends = require('../data/newFriends.js');

module.exports = function(app) {
    // display kardashians data in json format
    app.get('/api/friends', function(req, res) {
        res.json(kardashians);
    })

    app.get('/api/new-friends', function(req, res) {
        res.json(newFriends);
    })
}
