const mongoose = require("mongoose");

const akademijaSchema = new mongoose.Schema({
  ime: {
    type: String,
    required: [true, "Akademijata mora da ima ime"],
  },
  adresa: {
    type: String,
    required: [true, "Adresata e zadolzitelna"],
  }
});

const Akademija = mongoose.model("Akademija", akademijaSchema);

module.exports = Akademija;
