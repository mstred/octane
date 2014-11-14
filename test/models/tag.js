var assert = require('assert')
  , tests
  , Tag = geddy.model.Tag;

tests = {

  'after': function (next) {
    // cleanup DB
    Tag.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var tag = Tag.create({});
    tag.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
