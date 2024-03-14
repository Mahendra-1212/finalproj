const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean 
let flag=false;
users.forEach(function(obj,index){
  if(obj.username==username && obj.password==password){
    flag=true;
  }
});
return flag;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  let {username,password}=JSON.parse(JSON.stringify(req.body));
  let token="";
  if(authenticatedUser(username,password)){
    token=jwt.sign({ username:username }, 'this is secretkey.');
    req.session.username=token;
    res.status(300).json({message:"success1",token});
  }else{
    res.status(400).json({message:"invalid user"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
