const forTag = require("./parser-utils").forTag;

module.exports = forTag('example', (tags => {
  const examples = tags.map(tag => ({content: tag.content}));
  return examples.length ? {examples} : null;
}));
