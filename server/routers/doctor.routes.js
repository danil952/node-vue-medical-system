const { authJwt } = require("../middleware");
const controller = require("../controller/doctor.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/doctor/free",
    [authJwt.verifyToken],
    controller.getAllFree
  );
  app.get(
    "/api/doctor/busy",
    [authJwt.verifyToken],
    controller.getBusy
  );

  app.get(
    "/api/doctor/archive",
    [authJwt.verifyToken],
    controller.getArchive
  );

  app.get(
    "/api/doctors",
    controller.getDoctors
  );

  app.get(
    "/api/doctor/medtypeById/:id",
    controller.getMedTypeById
  );

  app.post(
    "/api/doctor/createRecord",
    [authJwt.verifyToken],
    controller.createRecord
  )

  app.delete(
    "/api/doctor/records/:id",
    [authJwt.verifyToken],
    controller.deleteRecord
  )



  


};