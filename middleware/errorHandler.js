const  constants  = require("../constants");
const errorHandler = (err, req, res, next) => {
//   const statusCode = res.statusCode ? res.statusCode : 500;
//   switch (statusCode) {
//     case constants.VALIDATION_ERROR:
//       res.json({
//         title: "Validation Failed",
//         message: err.message,
//         stackTrace: err.stack,
//       });
//       break;
//     case constants.NOT_FOUND:
//       res.json({
//         title: "Not Found",
//         message: err.message,
//         stackTrace: err.stack,
//       })
//       break;
//     case constants.UNAUTHORIZED:
//       res.json({
//         title: "Unauthorized",
//         message: err.message,
//         stackTrace: err.stack,
//       });
//       break;
//     case constants.FORBIDDEN:
//       res.json({
//         title: "Forbidden",
//         message: err.message,
//         stackTrace: err.stack,
//       });
//       break;
//     case constants.SERVER_ERROR:
//       res.json({
//         title: "Server Error",
//         message: err.message,
//         stackTrace: err.stack,
//       });
//       break;
//     default:
//       console.log("No Error, All good !");
      
//       break;
//   }
  res.json({message: err.message,stackTrace: err.stack});
};
// const statusCode=res.statusCode? res.statusCode:500;
// if(statusCode===404) res.send("Check carefully");
// if(statusCode===500) res.send("Checck carefully");
module.exports = errorHandler;