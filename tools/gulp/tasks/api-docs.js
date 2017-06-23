/**
 * Created by alireza on 6/23/17.
 */

const Dgeni = require('dgeni');
const gulp = require('gulp');
const dgeniApiDocsPackage = require('../../dgeni');


gulp.task('api-docs', apiDocs);


function apiDocs() {
  const dgeni = new Dgeni([dgeniApiDocsPackage]);
  return dgeni.generate().then(docs => {
    console.log(docs);
  });
}
