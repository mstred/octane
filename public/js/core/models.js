(function () {
var Passport = function () {
  this.defineProperties({
    authType: {type: 'string'},
    key: {type: 'string'}
  });

  this.belongsTo('User');
};

Passport = geddy.model.register('Passport', Passport);

}());

(function () {
var Post = function () {

  this.defineProperties({
    subject: {type: 'string', required: true},
    content: {type: 'text'}
  });

  this.hasMany('Tags');
  /*
  this.property('login', 'string', {required: true});
  this.property('password', 'string', {required: true});
  this.property('lastName', 'string');
  this.property('firstName', 'string');

  this.validatesPresent('login');
  this.validatesFormat('login', /[a-z]+/, {message: 'Subdivisions!'});
  this.validatesLength('login', {min: 3});
  // Use with the name of the other parameter to compare with
  this.validatesConfirmed('password', 'confirmPassword');
  // Use with any function that returns a Boolean
  this.validatesWithFunction('password', function (s) {
      return s.length > 0;
  });

  // Can define methods for instances like this
  this.someMethod = function () {
    // Do some stuff
  };
  */

};

/*
// Can also define them on the prototype
Post.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
Post.someStaticMethod = function () {
  // Do some other stuff
};
Post.someStaticProperty = 'YYZ';
*/

Post = geddy.model.register('Post', Post);

exports.Post = Post;}());

(function () {
var Tag = function () {

  this.property('value', 'string', {required: true});

  this.validatesPresent('value');
  this.validatesFormat('value', /[a-z]+/);

  this.belongsTo('Post');

}

Tag = geddy.model.register('Tag', Tag);

exports.Tag = Tag;}());

(function () {
var User = function () {
  this.defineProperties({
    username: {type: 'string', required: true, on: ['create', 'update']}
  , password: {type: 'string', required: true, on: ['create', 'update']}
  , familyName: {type: 'string', required: true}
  , givenName: {type: 'string', required: true}
  , email: {type: 'string', required: true, on: ['create', 'update']}
  , activationToken: {type: 'string'}
  , activatedAt: {type: 'datetime'}
  });

  this.validatesLength('username', {min: 3});
  this.validatesLength('password', {min: 8});
  this.validatesConfirmed('password', 'confirmPassword');

  this.hasMany('Passports');
};

User.prototype.isActive = function () {
  return !!this.activatedAt;
};

User = geddy.model.register('User', User);
}());