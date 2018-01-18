/**
 * Created by alireza on 6/23/17.
 */
const doc = require('../../api-docs/api-docs');
const glob = require('glob');
const gulp = require('gulp');
const fs = require("fs");


gulp.task('api-docs', getApiDocs);

function getFileNames() {
  return glob.sync('lib/**/*.ts', {
    ignore: ['lib/**/*.spec.ts']
  });
}

function getApiDocs() {
  let docs = doc(getFileNames());
  fs.writeFileSync('website/src/assets/api-docs.json', JSON.stringify(docs, null, 2));
  return docs;
}

/*
const Dgeni = require('dgeni');
const dgeniApiDocsPackage = require('../../dgeni');


gulp.task('api-docs', apiDocs);


function apiDocs() {
  const dgeni = new Dgeni([dgeniApiDocsPackage]);
  return dgeni.generate().then(docs => {
    console.log(docs);
  });
}
*/
