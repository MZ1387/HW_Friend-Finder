var path = require('path');

module.exports = function(app) {
  // send user to survey page
  app.get('/survey', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/survey.html'));
  })
  
  // if using the app and url is not defined send to home page
  app.use(function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/home.html'));
  })
}
