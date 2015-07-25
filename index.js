#!/usr/bin/env node


var request = require('request')
var fs = require('fs')
var glob = require("glob")
var path = require('path')
var args = process.argv.slice(2);



if(args[0] == 'deploy'){
  var domain = args[1]
  glob('./**/*',  function (er, files) {
    files.map(function(file){
      if(fs.lstatSync(file).isDirectory()){
        return false
      }
        var relative_path = path.relative('.', file);
        request.post({url:'http://cinob.tk:8080/' + domain + '/' + relative_path, formData: {
          main: fs.createReadStream(relative_path)
        }})
    })
  })
}
