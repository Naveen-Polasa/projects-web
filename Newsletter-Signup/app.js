const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

 const app = express();
 app.use(express.static("public"));
 app.use(bodyParser.urlencoded({extended: true}))

 app.get("/", function(req, res) {
   res.sendFile(__dirname+"/signup.html");
 })

 app.post("/", function(req, res) {
   const firstName = req.body.fName;
   const lastName = req.body.lName;
   const mail = req.body.email;

   const data  = {
     members: [
       {
         email_address: mail,
         status: "subscribed",
         merge_fields: {
           FNAME: firstName,
           LNAME: lastName
         }
       }
     ]
   }

   const jsonData = JSON.stringify(data);

   var url = "https://us14.api.mailchimp.com/3.0/lists/1b405e626d";
   var options = {
     method: "POST",
     auth: "Naveen:3d5083d7c84e0f8c627fa01a196cb66e-us14"
   }
  var request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    }
    else {
      res.sendFile(__dirname + "/failure.html");
    }

     response.on("data", function(data) {
       console.log(JSON.parse(data));
     })
   })

   request.write(jsonData);
   request.end();


 });

 app.post("/failure", function(req, res) {
   res.redirect("/");
 });


 app.listen(process.env.PORT, function(req, res) {
   console.log("server is up and running on 3000");
 })


//api-key
//3d5083d7c84e0f8c627fa01a196cb66e-us14

//list-id
//1b405e626d
