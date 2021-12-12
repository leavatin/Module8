var express = require('express');
var mongoose = require('mongoose');
var Student = require('./studentmodel')

const app = express();



app.listen (3000, (err)=>{
    if(!err){
        console.log("application connected to port 3000...")
    }else{
        throw err;
    }
});

const conString = "mongodb+srv://leavatin:nfrx705X@cluster0.ytyg2.mongodb.net/Practice?retryWrites=true&w=majority";
mongoose.connect(conString, (err)=>{
    if(!err){
        console.log("Database is connected to port 27017");
    }else{
        throw err;
    }
});



app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.get("/students/insert-record", (req,res)=>{
    let stud = {
        name:"Cathy Garcia",
        section:"3-ISA",
        age:18,
        subjects:[{
            code:"ics2609",
            description:"backend programming",
            units:3
        }]
    }; 
    Student.insertMany([stud], (err, docs)=>{aaaa
        if(!err){
            res.send(docs);
        }else{
            throw err;
        }
    })
})

app.get("/students/:id", (req,res)=>{
    /*let condition ={
        _id: re.params.id
    };*/
    Student.findById(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            throw err;
        }
    });
});
    
    app.get("/students/update-student/:id",(req,res)=>{
        let condition = {
            _id: req.params.id
        };
        let action = {
            name:"Peter Ramos"
        };
        Student.update(condition,action,(err,result)=>{
            if(!err){
                res.send(result);
            }else{
                throw err;
            }
        });
    });

    app.get("/students/delete-student/:id",(req,res)=>{
        let condition = {
            _id: req.params.id
        };
        Student.deleteOne(condition, (err)=>{
            if(!err){
                res.send("Deleted the docuement...");
            }else{
                throw err;
            }
        });
    });
    