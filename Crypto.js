
var crypto = require("crypto");
var express = require('express');
const MongoClient = require("mongodb").MongoClient;
const client =new MongoClient("mongodb://localhost:27017")
var port = 1111;
var app = express();

  app.get('/secret', function(request, response) {  
    
    //Connect and get message from MONGODB
     client.connect(function(err){
        if (err) throw err;

        const db=client.db("Crypto");
        const collection = db.collection("newCollection");

        //GET MESSAGE FROM COLLECTION
        collection.findOne({},function(err,doc){

            //Decrypt message
            var decipher = crypto.createDecipher("aes256","asaadsaad")
            var dec = decipher.update(doc.message,'hex','utf8')
            dec += decipher.final('utf8');
          
            //respone to client
            response.send(dec);
     });
    });

});


app.listen(port, function(){
    console.log('Server started at Port :', port);
})