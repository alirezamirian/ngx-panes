module.exports = function (tagNames, processor) {
  processor = processor || (i => i);
  return function (tags, classDeclaration) {
    return tags
      .filter(tag => tagNames.indexOf(tag.name) > -1)
      .reduce((result, tag) => Object.assign(result, {[tag.name]: processor(tag.content, classDeclaration)}), {});
  };
};
