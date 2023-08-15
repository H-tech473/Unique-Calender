const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
// const path = require("path");
const app = express();
const bodi = bodyParser.urlencoded({ extended: true});

app.use(bodi);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    const msg = fs.readFileSync("message.json", "utf-8");
    let dat = new Date();
    let ss = `${dat.getDate()} ${dat.getMonth()} ${dat.getFullYear()}`;
    var a = JSON.parse(msg);
    var t = false;
    var l = -1;
    for(let i=0; i<a.length; i++){
        let bbs = a[i][0].split("/");
        bbs = `${bbs[0]} ${bbs[1]} ${bbs[2]}`;
        if(bbs == ss){
            t = true;
            l = i;
            break;
        }
    }
    if(t) res.render("Calander", {
        textit: a[l][1],
        texdes: a[l][2],
        cls: `${a[l][0]}`
    });
    else res.render("Calander");
});
app.post("/done", (req, res) => {
    const msg = fs.readFileSync("message.json", "utf-8");
    var a = JSON.parse(msg);
    var b = [];
    b[0] = `${req.body.datess}`;
    b[1] = `${req.body.title}`;
    b[2] = `${req.body.desc}`;
    a[a.length] = b;
    var dat = JSON.stringify(a);
    fs.writeFileSync("message.json", dat);
    res.render("Calander", {
        ddms: `Done!!`
    });
});
app.get("/snooze",(req, res)=>{
    res.render("Calander", {
        ddms: "Remainder Snoozed"
    });
});
app.post("/turn",(req, res) =>{
    const msg = fs.readFileSync("message.json", "utf-8");
    var ddt = `${req.body.dateess}`;
    var a = JSON.parse(msg);
    let l = -2;
    var t = false;
    for(let i=0; i<a.length; i++){
        if(a[i][0] == ddt){
            l = i;
            t = true;
            break;
        }
    }
    if(t) a.splice(l,1);
    a = JSON.stringify(a);
    fs.writeFileSync("message.json", a);
    res.render("Calander.hbs", {
        ddms: "Remainder turned off"
    })
});
app.get("*", (req, res) =>{
    res.render("Calander", {
        ddms: "Wrong Url"
    });
});

app.listen(8000, ()=>{
    console.log("listening");
})