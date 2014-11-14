var Tag = function () {

  this.property('value', 'string', {required: true});

  this.validatesPresent('value');
  this.validatesFormat('value', /[a-z]+/);

  this.belongsTo('Post');

}

Tag = geddy.model.register('Tag', Tag);

exports.Tag = Tag;