 const mongoose = require('mongoose')

 const kursSchema = new mongoose.Schema({
    ime: {
        type: String,
        required: [true, "Akademijata mora da ima ime"],
      },
      adresa: {
        type: String,
        required: [true, "Adresata e zadolzitelna"],
      },
      oblast: {
        type: String,
        required: [true, "Oblasta e zadolzitelna"],
      }
 })

 const Kurs = mongoose.model("Kurs", kursSchema)

 module.exports =  Kurs;