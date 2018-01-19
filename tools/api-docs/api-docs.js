'use strict';

// NOTE: this code is originally borrowed from https://github.com/ng-bootstrap/ng-bootstrap

const {isDirectiveDecorator, isModuleDecorator} = require("./utils");

const ts = require('typescript');
const path = require('path');
const fs = require('fs');
const marked = require('marked');

const commentParsers = require('./parsers');
const parseDocComment = require('./parse-doc-comment');
const isComponentDecorator = require("./utils").isComponentDecorator;

function getNamesCompareFn(name) {
  name = name || 'name';
  return (a, b) => a[name].localeCompare(b[name]);
}

const ANGULAR_LIFECYCLE_METHODS = [
  'ngOnInit', 'ngOnChanges', 'ngDoCheck', 'ngOnDestroy', 'ngAfterContentInit', 'ngAfterContentChecked',
  'ngAfterViewInit', 'ngAfterViewChecked', 'writeValue', 'registerOnChange', 'registerOnTouched', 'setDisabledState'
];

function hasNoJSDoc(member) {
  if (!member.symbol) {
    return true;
  }

  const jsDoc = ts.displayPartsToString(member.symbol.getDocumentationComment());
  return jsDoc.trim().length === 0;
}

function isInternalMember(member) {
  if (member.jsDoc && member.jsDoc.length > 0) {
    for (let i = 0; i < member.jsDoc.length; i++) {
      if (member.jsDoc[i].tags && member.jsDoc[i].tags.length > 0) {
        for (let j = 0; j < member.jsDoc[i].tags.length; j++) {
          if (member.jsDoc[i].tags[j].tagName.text === 'internal') {
            return true;
          }
        }
      }
    }
  }

  return false;
}

function isAngularLifecycleHook(methodName) {
  return ANGULAR_LIFECYCLE_METHODS.indexOf(methodName) >= 0;
}

function isPrivate(member) {
  return (ts.getCombinedModifierFlags(member) & ts.ModifierFlags.Private) !== 0;
}

function isPrivateOrInternal(member) {
  return isPrivate(member) || hasNoJSDoc(member) || isInternalMember(member);
}

class APIDocVisitor {
  constructor(fileNames) {
    this.program = ts.createProgram(fileNames, {lib: ["lib.es6.d.ts"]});
    this.typeChecker = this.program.getTypeChecker(true);
  }

  visitSourceFile(fileName) {
    let sourceFile = this.program.getSourceFile(fileName);

    if (!sourceFile) {
      throw new Error(`File doesn't exist: ${fileName}.`)
    }

    return sourceFile.statements.reduce((elementsSoFar, statement) => {
      if (statement.kind === ts.SyntaxKind.ClassDeclaration) {
        return elementsSoFar.concat(this.visitClassDeclaration(fileName, statement));
      } else if (statement.kind === ts.SyntaxKind.InterfaceDeclaration) {
        return elementsSoFar.concat(this.visitInterfaceDeclaration(fileName, statement));
      }

      return elementsSoFar;
    }, []);
  }

  visitInterfaceDeclaration(fileName, interfaceDeclaration) {
    const symbol = this.program.getTypeChecker().getSymbolAtLocation(interfaceDeclaration.name);
    const description = marked(ts.displayPartsToString(symbol.getDocumentationComment()));
    const identifier = interfaceDeclaration.name.text;
    const members = this.visitMembers(interfaceDeclaration.members);

    return [{
      fileName,
      type: 'type',
      identifier,
      description,
      methods: members.methods,
      properties: members.properties
    }];
  }

  visitClassDeclaration(fileName, classDeclaration) {
    const symbol = this.program.getTypeChecker().getSymbolAtLocation(classDeclaration.name);
    const description = marked(ts.displayPartsToString(symbol.getDocumentationComment()));
    const identifier = classDeclaration.name.text;
    const members = this.visitMembers(classDeclaration.members);

    let doc = {fileName, identifier, description, methods: members.methods, properties: members.properties};
    let typeSpecificDoc = {};
    if (classDeclaration.decorators) {
      for (let i = 0; i < classDeclaration.decorators.length; i++) {
        if (isDirectiveDecorator(classDeclaration.decorators[i])) {
          const directiveInfo = this.visitDirectiveDecorator(classDeclaration.decorators[i]);
          typeSpecificDoc = {
            type: 'directive',
            isComponent: isComponentDecorator(classDeclaration.decorators[i]),
            selector: directiveInfo.selector,
            exportAs: directiveInfo.exportAs,
            inputs: members.inputs,
            outputs: members.outputs,
          };
        }
        if (isModuleDecorator(classDeclaration.decorators[i])) {
          const ngModuleInfo = this.visitModuleDecorator(classDeclaration.decorators[i]);
          typeSpecificDoc = {
            type: 'ngModule',
            declarations: ngModuleInfo.declarations,
            services: ngModuleInfo.services
            //  TODO: add dependencies (imports)
          }
        }
      }
    }
    return [Object.assign(doc, typeSpecificDoc, parseDocComment(classDeclaration, commentParsers))];
  }

  visitDirectiveDecorator(decorator) {
    let selector;
    let exportAs;
    const properties = decorator.expression.arguments[0].properties;

    for (let i = 0; i < properties.length; i++) {
      if (properties[i].name.text === 'selector') {
        // TODO: this will only work if selector is initialized as a string literal
        selector = properties[i].initializer.text;
      }
      if (properties[i].name.text === 'exportAs') {
        // TODO: this will only work if selector is initialized as a string literal
        exportAs = properties[i].initializer.text;
      }
    }

    return {selector, exportAs};
  }

  visitMembers(members) {
    const inputs = [];
    const outputs = [];
    const methods = [];
    const properties = [];
    let inputDecorator, outDecorator;

    for (let i = 0; i < members.length; i++) {
      inputDecorator = this.getDecoratorOfType(members[i], 'Input');
      outDecorator = this.getDecoratorOfType(members[i], 'Output');

      if (inputDecorator) {
        inputs.push(this.visitInput(members[i], inputDecorator));

      } else if (outDecorator) {
        outputs.push(this.visitOutput(members[i], outDecorator));

      } else if (
        (members[i].kind === ts.SyntaxKind.MethodDeclaration || members[i].kind === ts.SyntaxKind.MethodSignature) &&
        !isAngularLifecycleHook(members[i].name.text) && !isPrivateOrInternal(members[i])) {
        methods.push(this.visitMethodDeclaration(members[i]));
      } else if (
        (members[i].kind === ts.SyntaxKind.PropertyDeclaration ||
          members[i].kind === ts.SyntaxKind.PropertySignature || members[i].kind === ts.SyntaxKind.GetAccessor) &&
        !isPrivate(members[i]) && !isInternalMember(members[i])) {
        properties.push(this.visitProperty(members[i]));
      }
    }

    inputs.sort(getNamesCompareFn());
    outputs.sort(getNamesCompareFn());
    properties.sort(getNamesCompareFn());

    return {inputs, outputs, methods, properties};
  }

  visitMethodDeclaration(method) {
    return {
      name: method.name.text, description: getDocumentation(method),
      args: method.parameters ? method.parameters.map((prop) => this.visitArgument(prop)) : [],
      returnType: this.visitType(method.type)
    }
  }

  visitArgument(arg) {
    return {
      name: arg.name.text,
      type: this.visitType(arg),
      description: getDocumentation(arg)
    }
  }

  visitInput(property, inDecorator) {
    const inArgs = inDecorator.expression.arguments;
    return {
      name: inArgs.length ? inArgs[0].text : property.name.text,
      defaultValue: property.initializer ? this.stringifyDefaultValue(property.initializer) : undefined,
      type: this.visitType(property),
      description: getDocumentation(property)
    };
  }

  stringifyDefaultValue(node) {
    if (node.text) {
      return node.text;
    } else if (node.kind === ts.SyntaxKind.FalseKeyword) {
      return 'false';
    } else if (node.kind === ts.SyntaxKind.TrueKeyword) {
      return 'true';
    }
  }

  visitOutput(property, outDecorator) {
    const outArgs = outDecorator.expression.arguments;
    return {
      name: outArgs.length ? outArgs[0].text : property.name.text,
      description: getDocumentation(property)
    };
  }

  visitProperty(property) {
    return {
      name: property.name.text,
      defaultValue: property.initializer ? this.stringifyDefaultValue(property.initializer) : undefined,
      type: this.visitType(property),
      description: getDocumentation(property)
    };
  }

  visitType(node) {
    return node ? this.typeChecker.typeToString(this.typeChecker.getTypeAtLocation(node)) : 'void';
  }


  isServiceDecorator(decorator) {
    return decorator.expression.expression.text === 'Injectable';
  }

  getDecoratorOfType(node, decoratorType) {
    const decorators = node.decorators || [];

    for (let i = 0; i < decorators.length; i++) {
      if (decorators[i].expression.expression.text === decoratorType) {
        return decorators[i];
      }
    }

    return null;
  }

  visitModuleDecorator(decorator) {
    const statement = decorator.parent;
    const properties = decorator.expression.arguments[0].properties;
    const result = {
      declarations: [],
      services: []
    };

    properties.forEach(property => {
      if (property.name.text === 'exports') {
        // TODO: this only work when exports is a literal array
        if (property.initializer.kind === ts.SyntaxKind.ArrayLiteralExpression) {
          result.declarations = property.initializer.elements
            .filter(elem => elem.kind === ts.SyntaxKind.Identifier)
            .map(getFullyQualifiedName)
        }
        else {
          console.warn(`exports property of angular module "${statement.name.text}" is not a literal array, \
          and this is not yet supported in docs`);
        }
      }
    });
    return result;
  }
}

function parseOutApiDocs(programFiles) {
  const apiDocVisitor = new APIDocVisitor(programFiles);

  return programFiles.reduce(
    (soFar, file) => {
      return soFar.concat(apiDocVisitor.visitSourceFile(file));
    }, []);
}

function getDocumentation(declaration) {
  return marked(ts.displayPartsToString(declaration.symbol.getDocumentationComment()))
}

function getFullyQualifiedName(identifier) {
  // TODO: Only the simple usage of named imports is currently supported.
  const sourceFile = identifier.getSourceFile();
  let namedImportsContains = name => anImport => {
    let namedBindings = anImport.parent.importClause.namedBindings;
    if (namedBindings.elements.some(namedBinding => namedBinding.name.text === name)) {
      return true;
    }
  };
  const foundImport = sourceFile.imports.find(namedImportsContains(identifier.text));
  let fileName = sourceFile.fileName;
  if (foundImport) {
    fileName = path.normalize(`${path.dirname(fileName)}/${foundImport.text}`)
      .replace(new RegExp('\\' + path.sep, 'g'), '/');
  }
  return `${fileName}#${identifier.text}`;

}

module.exports = parseOutApiDocs;
