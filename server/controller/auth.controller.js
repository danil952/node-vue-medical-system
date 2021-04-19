const config = require("../config/auth.config");
const userRep = require('../repositories/userRep')
const doctorRep = require('../repositories/doctorRep')
const service = require('../service/service')

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age
    };
    userRep.post(user)
    .then(x=>
        {
            res.send({ message: "User was registered successfully!" });
        }
    )
    .catch(err=>
    {
        res.status(500).send({ message: err.message });
    });

};

exports.signupDoctor = (req, res) => {
  const doctor = {
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, 8),
          name: req.body.name,
          surname: req.body.surname,
          type_id: req.body.type_id
  };
  doctorRep.post(doctor)
  .then(x=>
      {
          res.send({ message: "User was registered successfully!" });
      }
  )
  .catch(err=>
  {
      res.status(500).send({ message: err.message });
  });

};

exports.signin = (req, res) => {
    service.getUserByUsername(req.body.username)
    .then(user => {

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id, type: "user" }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        name: user.name,
        surname: user.surname,
        age: user.age,
        accessToken: token,
        type: "client"
        
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signinDoctor = (req, res) => {
  service.getDoctorByUsername(req.body.username)
  .then(doctor => {

    if (!doctor) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      doctor.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var token = jwt.sign({ id: doctor.id, type: "doctor"}, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      id: doctor.id,
      username: doctor.username,
      name: doctor.name,
      surname: doctor.surname,
      type_id: doctor.type_id,
      accessToken: token,
      type: "doctor"
      
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};