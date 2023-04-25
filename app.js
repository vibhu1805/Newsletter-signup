//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/signup.html");
});
app.post("/",function(request,res){
    const firstName = request.body.fName;
    const lastName = request.body.lName;
    const email = request.body.email;
    const data = {
        members:[
            {
                email_address: email,
                merge_fields: {
                    FNAME: firstName,
                    LASTNAME: lastName
                }
                

            }
        ]
    };
    const jsonData =JSON.stringify(data);
    const url = "https://us12.api.mailchimp.com/3.0/lists/634259db7f";
    const options = {
        method:"POST",
        auth: "vibhu05:bd9e98857cf890d051637e22b4e1bed2-us12"
    }
    const req = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));

        });

    })
    req.write(jsonData);
    req.end();


});
app.post("/failure",function(request,response){
    response.redirect("/");
})
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running");
});
//API KEY
//bd9e98857cf890d051637e22b4e1bed2-us12
//Audience KEY 
//634259db7f