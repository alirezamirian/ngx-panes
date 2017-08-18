module.exports = function (tags) {
  const examples = tags
    .filter(tag => tag.name === 'example') // example tags
    .map(tag => ({content: tag.content})); // map to example object
  return examples.length ? {examples} : null;
};
