module.exports.forTag = forTag;


function forTag(tagName, parser) {
  return function (tags, statement) {
    return parser(tags.filter(tag => tag.name === tagName), statement);
  }
}
