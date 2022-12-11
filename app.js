//This file is the server of this project
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.post("/", function(req, res){
    const f_name = req.body.f_name;
    const l_name = req.body.s_name; //req by the name of the form elements
    const e_mail = req.body.email;
    
    const data = {
        members: [
            {
                email_address: e_mail,
                status: "subscribed",
                merge_fields: {
                    FNAME: f_name,
                    LNAME: l_name
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/f745cb3996";
    const options = {
        method : "POST",
        auth: "piyumal:ed23a8a167c583b62a113a4dca81addc-us18"
    }

    const request = https.request(url, options, function(responce){
        responce.on("data", function(data){
            console.log(JSON.parse(data));
        });
        if(responce.statusCode == 200){
           res.sendFile(__dirname + "/success.html");
        }else{
           res.sendFile(__dirname + "/failure.html");
        }
    });
    request.write(jsonData);
    request.end();
});


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/failure.html", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || port,function() {
  console.log(`Example app listening on port ${port}`)
});



//api-key : ed23a8a167c583b62a113a4dca81addc-us18
//audiance-id : f745cb3996 