var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');
var Root = mongoose.model('RootUser');
module.exports = function (app) {
 // app.use('/', router);
};

router.get('/', function (req, res, next) {
  Root.find(function (err, root) {
    if (err) return next(err);
    res.json(root)
  });
});
