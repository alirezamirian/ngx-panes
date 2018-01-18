const beautifier = require('js-beautify')
const isDirectiveClass = require("../utils").isDirectiveClass;

module.exports = [
  require('./example-parser'),
  require('./string-parser-factory')('usage', reformatCode)
];


function reformatCode(content, classDeclaration) {
  if (isDirectiveClass(classDeclaration)) {
    return beautifier.html(content, {indent_size: 2});
  }
}
