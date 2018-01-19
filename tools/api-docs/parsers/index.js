const beautifier = require('js-beautify');
const prettier = require("prettier");
const isServiceClass = require("../utils").isServiceClass;

const isNgModuleClass = require("../utils").isNgModuleClass;
const isDirectiveClass = require("../utils").isDirectiveClass;

module.exports = [
  require('./example-parser'),
  require('./string-parser-factory')('usage', reformatCode)
];


function reformatCode(content, classDeclaration) {
  if (isDirectiveClass(classDeclaration)) {
    return beautifier.html(content, {indent_size: 2});
  }
  if (isNgModuleClass(classDeclaration) || isServiceClass(classDeclaration)) {
    try {
      return prettier.format(content);
    }
    catch (e) {
      console.warn(`An error happened in formatting usage of ${classDeclaration.name.text}:`, e);
      return content;
    }
  }
  return content;
}
