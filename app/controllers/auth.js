var passport = require('../helpers/passport');

var Auth = function () {

  this.validate = function(self) {
    self.logged = self.session.get('userId') !== undefined;
  };

  geddy.mixin(this, passport.actions);
};

exports.Auth = Auth;
