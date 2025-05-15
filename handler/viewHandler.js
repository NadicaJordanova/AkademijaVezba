const Akademija = require('../model/academySchema')

exports.getTest = async (req, res) => {
    try {
      res.status(200).render("test", {
        title: "Test",
        podnaslov: "Тест за backend развој на софтвер"
      });
    } catch (err) {
      
      res.status(500).send("Error rendering the page");
    }
  };
  
  exports.getAkademii = async (req, res) => {
    try{
     const akademii = await Akademija.find()
     res.status(200).render('welcome', {
        title: "Dostapni Akademii",
        akademii: akademii
     })
    }
  catch(err){
   
    res.status(500).send("Error rendering the page");
  }
}