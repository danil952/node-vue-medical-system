const { verifySignUp } = require("../middleware");
const controller = require("../controller/auth.controller");
const Router = require('express').Router;

const authRouter = Router();


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post(
    "/api/auth/doctor/signup",
    [
      verifySignUp.checkDoctorDuplicateUsernameOrEmail
    ],
    controller.signupDoctor
  );

  app.post("/api/auth/doctor/signin", controller.signinDoctor);
};