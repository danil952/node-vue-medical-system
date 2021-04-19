const service = require('../service/service')

const checkDuplicateUsernameOrEmail = (req, res, next) => {

    service.getUserByUsername(req.body.username)
    .then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Username is already in use!"
        });
        return;
      }
      next();
    });
  };
  const checkDoctorDuplicateUsernameOrEmail = (req, res, next) => {

    service.getDoctorByUsername(req.body.username)
    .then(doctor => {
      if (doctor) {
        res.status(400).send({
          message: "Failed! Username is already in use!"
        });
        return;
      }
      next();
    });
  };
  

  const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkDoctorDuplicateUsernameOrEmail: checkDoctorDuplicateUsernameOrEmail
  };
  
  module.exports = verifySignUp;