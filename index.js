const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){debugger;
    const token=(req.header("Authorization")==undefined?undefined:req.header("Authorization").replace("Bearer ",""))||null;
   if(token==null){
       res.status(404).send({message:"Invalid User"});
       return;
   }
    const validobject =jwt.verify(token, 'this is secretkey.');
    req.username=validobject.username;
    next();
   
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));