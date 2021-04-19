const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/user/active",
    [authJwt.verifyToken],
    controller.getUserActiveRecords
  );
  app.get(
    "/api/user/archive",
    [authJwt.verifyToken],
    controller.getUserArchiveRecords
  );

  app.get(
    "/api/user/free/category/:id",
    [authJwt.verifyToken],
    controller.getRecordsByType
  );

  app.get(
    "/api/users",
    controller.getUsers
  )

  app.post(
    "/api/user/record/:id",
    [authJwt.verifyToken],
    controller.createUserRecord
  )

  


};