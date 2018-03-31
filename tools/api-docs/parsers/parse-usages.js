const beautifier = require('js-beautify');
const prettier = require("prettier");

const isDirectiveClass = require("../utils").isDirectiveClass;
const forTag = require("./parser-utils").forTag;

module.exports = forTag('usage', parseUsages);

function parseUsages(tags, statement) {
  return {
    usage: tags.map(tag => {
      const content = tag.content;
      if (isDirectiveClass(statement)) {
        return {code: beautifier.html(content, {indent_size: 2}), lang: 'html'};
      }
      else { // assumption: usage of all other things is in TS. (is it a safe assumption?)
        try {
          return {code: prettier.format(content), lang: 'typescript'};
        }
        catch (e) {
          console.warn(`An error happened in formatting usage of ${statement.toString()}:`, e);
          return content;
        }
      }
    })
  };
}
