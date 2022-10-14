//import express from "express";
// For require()
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express = require('express');
// create the server
const app = express();
//Set server port
const port = process.env.PORT || 3000;
// It allows to read/write/manipulate files 
const fs = require("fs");
// It allows you to work with file path names
const path = require("path");
// Routing refers to how an application’s endpoints (URIs) respond to client requests.
const router = express.Router();

// For home page
app.get('/', (req, res)=> {
    //res.sendFile(path.join(__dirname+'index.html'));
    res.sendFile('/Users/ahsan/OneDrive - Carleton University/Documents/comp 2406/Fall2020/MovieProject/Website/index.html');
});

// For home button
app.get('/index.html', (req, res)=> {
    //res.sendFile(path.join(__dirname+'index.html'));
    res.sendFile('/Users/ahsan/OneDrive - Carleton University/Documents/comp 2406/Fall2020/MovieProject/Website/index.html');
});

// For user's profile page 
router.get('/user_profile.html',function(req,res){
  res.sendFile('/Users/ahsan/OneDrive - Carleton University/Documents/comp 2406/Fall2020/MovieProject/Website/user_profile.html');
});

// For directors' page
router.get('/Artists/directors.html',function(req,res){
    res.sendFile('/Users/ahsan/OneDrive - Carleton University/Documents/comp 2406/Fall2020/MovieProject/Website/directors.html');
});

app.use(express.static('public'));

//add the router
app.use('/', router);
app.listen(port, ()=> console.log("Server listening at localhost:" + port));
