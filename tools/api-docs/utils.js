module.exports = {
  isDirectiveDecorator,
  isComponentDecorator,
  isModuleDecorator,
  isDirectiveClass
};


function isDirectiveDecorator(decorator) {
  const decoratorIdentifierText = decorator.expression.expression.text;
  return decoratorIdentifierText === 'Directive' || decoratorIdentifierText === 'Component';
}

function isComponentDecorator(decorator) {
  const decoratorIdentifierText = decorator.expression.expression.text;
  return decoratorIdentifierText === 'Component';
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
