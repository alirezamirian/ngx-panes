const beautifier = require('js-beautify');
const prettier = require("prettier");

const isDirectiveClass = require("../utils").isDirectiveClass;

module.exports = [
  require('./example-parser'),
  require('./string-parser-factory')('usage', reformatCode)
];


function reformatCode(content, statement) {
  if (isDirectiveClass(statement)) {
    return {text: beautifier.html(content, {indent_size: 2}), usageLang: 'html'};
  }
  else { // assumption: usage of all other things is in TS. (is it a safe assumption?)
    try {
      return {text: prettier.format(content), otherProps: {usageLang: 'typescript'}};
    }
    catch (e) {
      console.warn(`An error happened in formatting usage of ${statement.toString()}:`, e);
      return content;
    }
  }
  return content;
}
