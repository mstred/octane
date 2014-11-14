var requireAuth = require('../helpers/passport').requireAuth
  , tagsByPost = require('../helpers/posts').tagsByPost;

var Post = geddy.model.Post
, Tag = geddy.model.Tag;

var Posts = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  // this.before(requireAuth);

  this.index = function (req, resp, params) {
    var self = this;
    Post.all(function(err, posts) {
      if (err) {
        self.error(err);
      } else {
        posts.forEach(tagsByPost);
        self.respondWith(posts);
      }
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this;
    var post = Post.create(params);
    post.save(function(e, d) {
      if (e) throw e;
      params.tags.forEach(function(el) {
        post.addTag(Tag.create({ value: el }));
      });
    });
    post.save(function (e, d) { 
      if (e) throw e;
      self.respond(null, {statusCode: 201});
    });
  };

  this.show = function (req, resp, params) {
    var self = this;
    Post.first({ id: params.id }, function(e, post) {
      if (e) self.error(err);
      tagsByPost(post);
      self.respondWith(post);
    });
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
    Post.first(params.id, function(err, post) {
      if (err) throw err;
      if (!post) {
        throw new geddy.errors.BadRequestError();
      } else {
        Post.remove(params.id, function(err) {
          if (err) throw err;
          _this.respondWith(post);
        });
      }
    });
  };
};

exports.Posts = Posts;