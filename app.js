const express = require("express");
const akademiiHandler = require('./handler/akademiiHandler')
const kurseviHandler = require('./handler/kursoviHandler')
const viewhandler = require('./handler/viewHandler')
const app = express();
const database = require('./pkg/database/index')
database.connectToDataBase();
const auth = require('./handler/auth')



app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


const path = require("path");
const viewHandler = require("./handler/viewHandler");

app.set("view engine", "ejs");
app.get("/test", viewHandler.getTest);
app.get('/welcome', viewHandler.getAkademii)


app.post('/signup', auth.signUp)
app.post('/login', auth.logIn )



app.post("/createAcademy" , auth.protect, akademiiHandler.createAkademija)
app.patch('/updateAcademy/:id', auth.protect, akademiiHandler.updateAkademija)
app.get('/academies', akademiiHandler.getAkademii)
app.delete('/deleteAcademy/:id',auth.protect, akademiiHandler.deleteAkademija)

app.post('/createKurs', auth.protect, kurseviHandler.createKurs)
app.patch('/updateKurs/:id', auth.protect, kurseviHandler.updateKurs)
app.delete("/deleteKurs/:id" ,auth.protect, kurseviHandler.deleteKurs)
app.get('/kursevi', auth.protect, kurseviHandler.siteKursevi)



app.listen(10000, (err) => {
    if (err) return console.log(err.message);
    return console.log(`Successfully started on port ${process.env.PORT}`);
  });