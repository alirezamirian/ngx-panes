/**
 * extracts an object based on documentation tags and
 */

const RE_COMMENT_LINE = /^\s*\*(?:\s(\s*)|$)/m;

module.exports = function parseDocComment(classDeclaration, parsers) {
  parsers = parsers || [];
  let allTags = (classDeclaration.jsDoc || [])
    .reduce((tagsSoFar, jsDoc) => tagsSoFar.concat(jsDoc.tags ? jsDoc.tags.map(mapTag) : []), []);

  if (allTags.length === 0) {
    return null;
  }
  return parsers
    .map(parser => parser(allTags, classDeclaration)) // get parser outputs
    .reduce((soFar, output) => Object.assign(soFar, output), {}); // merge outputs
};

function stripStars(comment) {
  return (comment || '').replace(RE_COMMENT_LINE, '');
}

function mapTag(tag) {
  return {name: tag.tagName.text, content: stripStars(tag.comment)};
}
