module.exports = function (tagNames, processor) {
  processor = processor || (content => ({text: content, otherProps: {}}));
  return function (tags, classDeclaration) {
    return tags
      .filter(tag => tagNames.indexOf(tag.name) > -1)
      .reduce((result, tag) => {
        let output = processor(tag.content, classDeclaration);
        return Object.assign(result, {[tag.name]: output.text}, output.otherProps);
      }, {});
  };
};
