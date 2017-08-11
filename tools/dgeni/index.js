/**
 * Created by alireza on 6/23/17.
 */


const path = require('path');
const fs = require('fs');
const Dgeni = require('dgeni');
const DgeniPackage = Dgeni.Package;

// dgeni packages
const jsdocPackage = require('dgeni-packages/jsdoc');
const nunjucksPackage = require('dgeni-packages/nunjucks');
const typescriptPackage = require('dgeni-packages/typescript');


// Project configuration.
const projectRootDir = path.resolve(__dirname, '../..');
const sourceDir = path.resolve(projectRootDir, 'lib');
const outputDir = path.resolve(projectRootDir, 'docs/api');
const templateDir = path.resolve(__dirname, './templates');

const apiDocsPackage = new DgeniPackage('ngx-panes-api-docs', [
  jsdocPackage,
  nunjucksPackage,
  typescriptPackage
])

// Configure the processor for reading files from the file system.
  .config(function (readFilesProcessor, writeFilesProcessor) {
    readFilesProcessor.basePath = sourceDir;
    readFilesProcessor.$enabled = false; // disable for now as we are using readTypeScriptModules

    writeFilesProcessor.outputFolder = outputDir;
  })

  // Processor that appends categorization flags to the docs, e.g. `isDirective`, `isNgModule`, etc.
  .processor(require('./processors/categorizer'))


  // Configure the processor for understanding TypeScript.
  .config(function (readTypeScriptModules) {
    console.log(sourceDir);
    readTypeScriptModules.basePath = sourceDir;
    readTypeScriptModules.ignoreExportsMatching = [/^_/];
    readTypeScriptModules.hidePrivateMembers = true;

    // Entry points for docs generation. All publically exported symbols found through these
    // files will have docs generated.
    readTypeScriptModules.sourceFiles = [
      '**/*.component.ts',
      '**/*.directive.ts',
      '**/*.service.ts',
      '**/*.module.ts',
    ];
  })
  // Configure processor for finding nunjucks templates.
  .config(function (templateFinder) {
    // Where to find the templates for the doc rendering
    templateFinder.templateFolders = [templateDir];

    // Add a folder to search for our own templates to use when rendering docs
    templateFinder.templateFolders.unshift(path.resolve('templates'));

    // Specify how to match docs to templates.
    // In this case we just use the same static template for all docs
    templateFinder.templatePatterns.unshift('json-template.txt');
  })

  .config(function (log) {
    log.level = 'info';
  });


module.exports = apiDocsPackage;
