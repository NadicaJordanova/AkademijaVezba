const Akademija = require("../model/academySchema");

exports.createAkademija = async (req, res) => {
  try {
    const novaAkademija = await Akademija.create(req.body);
    res.status(200).json({
      status: "Success",
      akademija: novaAkademija,
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

exports.updateAkademija = async (req, res) => {
    try{
      console.log(req.params.id)
      const Academy = await Akademija.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({
        status: "Success",
        akademija: Academy,
      });
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            message: err.message,
          });
    }
}


exports.getAkademii = async (req, res) => {
    try{
    const Akademii = await Akademija.find()
      res.status(200).json({
        status: "Success",
        akademii: Akademii,
      });
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            message: err.message,
          });
    }
}


exports.deleteAkademija = async (req, res) => {
    try{
      const izbrisanaAkademija = await Akademija.findByIdAndDelete(req.params.id)

      res.status(200).json({
        status: "Success",
        akademija: izbrisanaAkademija
      })

    }
    catch(err){
        res.status(500).json({
            status: "fail",
             message: err.message
        })
    }
}