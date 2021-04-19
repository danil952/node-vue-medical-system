const doctorRecRep = require('../repositories/doctorRecRep')
const doctorRep = require("../repositories/doctorRep")
const medtypeRep = require("../repositories/medtypeRep")
const { compare } = require('bcryptjs');



exports.getAllFree= (req,res) =>
{
  doctorRecRep.getFree(req.userId)
  .then(
    rows=>
    {
      res.status(200).send({tickets: rows});
    }
  )
  .catch(err => {
    res.status(500).send({ message: err.message });
    });
}

exports.getBusy= (req,res) =>
{
  doctorRecRep.getBusy(req.userId)
  .then(
    rows=>
    {
      res.status(200).send({tickets: rows});
    }
  )
  .catch(err => {
    res.status(500).send({ message: err.message });
    });
}

exports.getArchive= (req,res) =>
{
  doctorRecRep.getArchive(req.userId)
  .then(
    rows=>
    {
      res.status(200).send({tickets: rows});
    }
  )
  .catch(err => {
    res.status(500).send({ message: err.message });
    });
}

exports.getMedTypeById= (req,res) =>
{
  const id= parseInt(req.params.id);
  medtypeRep.findByTypeId(id)
  .then(
    rows=>
    {
      res.status(200).send(rows);
    }
  )
  .catch(err => {
    res.status(500).send({ message: err.message });
    });
}

exports.getDoctors=(req,res)=>
{
  doctorRep.getAll()
  .then(
    rows=>
    {
      res.status(200).send({doctors: rows});
    }
  )
  .catch(err=>{
    res.status(500).send({ message: err.message });
  });
}

exports.createRecord=(req,res)=>
{
  const record = req.body;
  doctorRecRep.post(record)
  .then(()=>
  {
    res.status(200).send()
  }
  )
  .catch(err => {
    res.status(500).send({ message: err.message });
    });
}

exports.deleteRecord =(req,res)=>
{
  const id = parseInt(req.params.id);
  const user_id = req.userId;
  doctorRecRep.get(id)
  .then(record=>
    {
      if(record.doctor_id==user_id)
      {
        doctorRecRep.remove(id);
      }
    }
  )
  .then(res.status(200).send())
  .catch(err => {
    res.status(500).send({ message: err.message });
    });
}

