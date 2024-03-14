const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
 let {username,password}=JSON.parse(JSON.stringify(req.body));
 if(!!username&&!!password){
   users.push({username,password});
 }
  return res.status(300).json({message: "user registered successfully!"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  
  return res.status(300).json({books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let booklist=[];
  let isbn=req.params?.isbn||"";
  booklist=fetchByKey(books,isbn,"isbn");
  return res.status(300).json({booklist});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let booklist=[];
  let author=req.params?.author||"";
  
  booklist=fetchByKey(books,author,"author");
  return res.status(300).json({booklist});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {debugger;

  let booklist=[];
  let title=req.params?.title||"";
  
  booklist=fetchByKey(books,title,"title");
  return res.status(300).json({message:booklist});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let booklist=[];
  let isbn=req.params?.review||"";
  booklist=fetchByKey(books,isbn,"isbn");
  let bookreview=booklist[0].review;

  return res.status(300).json(bookreview);
});

const fetchByKey=(books,searchText,keyText)=>{
  try{
    let booklist=[];
    searchText=(searchText.replace(/ /g,"")).toLocaleLowerCase();
    for(key in books){
      let obj=books[key];
      let booktitle=(obj[keyText].replace(/ /g,"")).toLocaleLowerCase();
      if(booktitle==searchText){
        booklist.push(obj);
      }
    }
    return booklist;
  }catch(e){
    console.error(e);
  }
}

module.exports.general = public_users;
