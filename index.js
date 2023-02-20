const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();
const app = express();


const PORT = process.env.PORT;
app.get("/",(req, res)=>{
    res.send({filepath : {
        home : "/",
        create_new_file : "/createfile",
        read_file : "/readfile"
    }})
});

// create new date and time : 
let current = new Date();
let cDate =
  current.getFullYear() +
  "-" +
  (current.getMonth() + 1) +
  "-" +
  current.getDate();
let cTime =
  current.getHours() + "." + current.getMinutes() + "." + current.getSeconds();
let dateTime = cDate + " " + cTime;
console.log(dateTime);

// create new file :
app.get("/createfile", (req, res) => {

  fs.writeFile(`./files/${dateTime}.doc`, dateTime, (err) => {
    console.log(`${dateTime}.doc created successfully`);
  });
  res.send({ msg: `${dateTime}.doc created successfully` });
});

// reed file : 
app.get("/readfile", (req, res) => {

  fs.readdir("files", (err, data) => {
    if (err) {
      return res.status(404).send(err);
    } else {
      return res.status(200).send({ files: data });
    }
  });
});

app.listen(PORT, ()=>{console.log(`App is running on port : ${PORT}`)})