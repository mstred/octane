var requireAuth = require('../helpers/passport').requireAuth;

var Posts = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  // this.before(requireAuth);

  this.index = function (req, resp, params) {
    var _this = this;
    geddy.model.Post.all(function(err, posts) {
      if (err) {
        _this.error(err);
      } else {
        _this.respondWith(posts);
      }
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    // Save the resource, then display index page
    var _this = this;
    var post = geddy.model.Post.create(JSON.parse(req.body));
    post.save(function (err, data) {
      if (err) {
        _this.error(err);
      } else {
        _this.respond(null, {statusCode: 201});
      }
    });
  };

  this.show = function (req, resp, params) {
    this.respond({params: params});
  };

  this.edit = function (req, resp, params) {
    this.respond({params: params});
  };

  this.update = function (req, resp, params) {
    // Save the resource, then display the item page
    this.redirect({controller: this.name, id: params.id});
  };

  this.remove = function (req, resp, params) {
    var _this = this;
    geddy.model.Post.first(params.id, function(err, post) {
      if (err) throw err;
      if (!post) {
        throw new geddy.errors.BadRequestError();
      } else {
        geddy.model.Post.remove(params.id, function(err) {
          if (err) throw err;
          _this.respondWith(post);
        });
      }
    });
  };

};

exports.Posts = Posts;

