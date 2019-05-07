/*
  Aman Kharbanda
  Subscribe my channel for more videos
  https://goo.gl/H91NRo
  Thanks!
*/

const express = require('express');
var app = express();



var upload = require('express-fileupload');
const http = require('http');



http.Server(app).listen(8008); // make server listen on port 80

app.use(upload()); // configure middleware

console.log("Server Started at port 80");

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
})


app.post('/upload',function(req,res){
  console.log(req.files);
  if(req.files.upfile){
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
    var uploadpath = __dirname + '/uploads/' + name;
    file.mv(uploadpath,function(err){
      if(err){
        console.log("File Upload Failed",name,err);
        res.send("Error Occured!")
      }
      else {
        console.log("File Uploaded",name);
        res.send('Done! Uploading files')
      }
    });
  }
  else {
    res.send("No File selected !");
    res.end();
  };
})
