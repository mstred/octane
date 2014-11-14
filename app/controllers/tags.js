var Tag = geddy.model.Tag;

var Tags = function () {

  this.respondsWith = ['json'];

  this.index = function (req, resp, params) {
    var _this = this;
    Tag.all(function(err, tags) {
      if (err) {
        _this.error(err);
      } else {
        _this.respondWith(tags);
      }
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var _this = this;
    var tag = Tag.create(JSON.parse(req.body));
    if (tag.isValid()) {
      tag.save(function (err, data) {
        if (err) {
          _this.error(err);
        } else {
          _this.respond(null, {statusCode: 201});
        }
      });
    } else {
      _this.error();
    }
  };

  this.show = function (req, resp, params) {
    var _this = this;
    Tag.first({id: params.id}, function(err, tag) {
      if (err) _this.error(err);
      _this.respondWith(tag);
    });
  };

  this.edit = function (req, resp, params) {
    this.respond({params: params});
  };

  this.update = function (req, resp, params) {
    var _this = this;
    Tag.first({id: params.id}, function(err, tag) {
      if (err) _this.error(err);
      tag.updateProperties({value: params.value});
      tag.save(function(saveErr, savedData) {
        if (saveErr) _this.error(saveErr);
        _this.respond(null, {statusCode: 200});
      });
    }); 
  };

  this.remove = function (req, resp, params) {
    var _this = this;
    Tag.remove(params.id, function(err) {
      if (err) _this.error(err);
      _this.respond(null, {statusCode: 200});
    });
  };
};

exports.Tags = Tags;