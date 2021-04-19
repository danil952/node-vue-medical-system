const recordRep = require('../repositories/userRecRep')
const doctorRecRep = require('../repositories/doctorRecRep')
const userRep = require("../repositories/userRep")
const userRecRep = require("../repositories/userRecRep")
const { compare } = require('bcryptjs');



exports.getUserActiveRecords = (req, res) => {
  recordRep.getActive(req.userId)
    .then(
      rows => {
        res.status(200).send({ tickets: rows });
      }
    )
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.getUserArchiveRecords = (req, res) => {
  recordRep.getArchive(req.userId)
    .then(
      rows => {
        res.status(200).send({ tickets: rows });
      }
    )
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}
exports.getRecordsByType = (req, res) => {
  const type_id = parseInt(req.params.id);
  doctorRecRep.getFreeByType(type_id)
    .then(
      rows => {
        res.status(200).send({ tickets: rows });
      }
    )
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.createUserRecord = (req, res) => {
  const user_id = req.userId;
  const record_id = parseInt(req.params.id)
  const record =
  {
    user_id: user_id,
    doctor_rec_id: record_id
  }
  doctorRecRep.get(record_id)
    .then(
      (item) => {
        item.busy = 'true';
        doctorRecRep.put(record_id, item)
      }
    )
    .then(
      () => {
        userRecRep.post(record)
      }
    )
    .then(
      () => {
        res.status(200).send()
      })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });

}
exports.getUsers = (req, res) => {
  userRep.getAll()
    .then(
      rows => {
        res.status(200).send({ users: rows });
      }
    )
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

