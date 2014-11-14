exports.tagsByPost = function (post) {
  var tags = [];
  post.getTags(function(e, d) {
    if (e) throw e;
    d.forEach(function(el, ix) { tags[ix] = el.value; });
  });
  post.tags = tags;
};