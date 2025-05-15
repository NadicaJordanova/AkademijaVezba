const Kurs = require('../model/kursSchema')

exports.createKurs = async (req, res) => {
    try{
     const novKurs = await Kurs.create(req.body)
      res.status(200).json({
        status: "Success",
        kurs: novKurs
      })
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            message: err.message,
          });
    }
}


exports.updateKurs = async (req, res) => {
    try{
     const izmenetKurs = await Kurs.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({
        status: "Success",
        kurs: izmenetKurs
      })
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            message: err.message,
          });
    }
}

exports.deleteKurs = async (req, res) => {
    try{
     const izbrisanKurs = await Kurs.findOneAndDelete(req.params.id)
      res.status(200).json({
        status: "Success",
        kurs: izbrisanKurs
      })
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            message: err.message,
          });
    }
}

exports.siteKursevi = async (req, res) => {
    try{
        const kursevi = await Kurs.find()
        res.status(200).json({
            status: "Success",
            kursevi: kursevi
          })
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            message: err.message,
          });
    }
}