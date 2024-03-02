const app = require("./app.js");
const connectToDatabase = require("./config.js/db.js");
const { PORT } = require("./secret");
const swaggerDoc = require("./utils/Swagger.js");
const { errorMessgae } = require("./utils/response.js");

app.listen(PORT, async () => {
  console.log(`Server Started At Port : ${PORT}`);
  await connectToDatabase();
  swaggerDoc(app, PORT);

  // Client-Side Route Error.
  app.use((req, res, next) => {
    next({ status: 404, message: "No Routes Found!!" });
  });

  // Error Handling.
  app.use((err, req, res, next) => {
    return errorMessgae(res, err);
  });

});
