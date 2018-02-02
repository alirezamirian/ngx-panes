const ts = require('typescript');

module.exports = {
  isDirectiveDecorator,
  isComponentDecorator,
  isModuleDecorator,
  isDirectiveClass,
  isNgModuleClass,
  isServiceClass,
  isExported
};


function isDirectiveDecorator(decorator) {
  const decoratorIdentifierText = decorator.expression.expression.text;
  return decoratorIdentifierText === 'Directive' || decoratorIdentifierText === 'Component';
}

function isComponentDecorator(decorator) {
  return decorator.expression.expression.text === 'Component';
}

function isServiceDecorator(decorator) {
  return decorator.expression.expression.text === 'Injectable'
}

function isModuleDecorator(decorator) {
  const decoratorIdentifierText = decorator.expression.expression.text;
  return decoratorIdentifierText === 'NgModule';
}

function isDirectiveClass(classDeclaration) {
  if (classDeclaration.decorators) {
    for (let i = 0; i < classDeclaration.decorators.length; i++) {
      if (isDirectiveDecorator(classDeclaration.decorators[i])) {
        return true;
      }
    }
  }
  return false;
}

function isNgModuleClass(classDeclaration) {
  if (classDeclaration.decorators) {
    for (let i = 0; i < classDeclaration.decorators.length; i++) {
      if (isModuleDecorator(classDeclaration.decorators[i])) {
        return true;
      }
    }
  }
  return false;
}

function isServiceClass(classDeclaration) {
  if (classDeclaration.decorators) {
    for (let i = 0; i < classDeclaration.decorators.length; i++) {
      if (isServiceDecorator(classDeclaration.decorators[i])) {
        return true;
      }
    }
  }
  return false;
}


function isExported(statement) {
  return Array.isArray(statement.modifiers) &&
    statement.modifiers.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)
}
