const express = require("express");
const cors = require("cors");
const { config } = require("./common/config/index");
const { configSchema } = require("./common/schemas/config.schema");
const { validator } = require("./lib/validator");
const { dbConection } = require("./lib/dbConnection");
const { CustomError } = require("./lib/customError");
const { ResData } = require("./lib/resData");
const { router } = require("./modules/module.routes");
const dotenv = require("dotenv");



validator(configSchema, config);




dotenv.config();
const app = express();



app.use(cors());
app.use(express.json());




(async () => {
  try {
    await dbConection.connect();
    console.log("db successfully connected");
  } catch (error) {
    throw new CustomError(500, error.message);
  }
})();



app.use("/api", router);




app.use((req, res, next) => {
  try {
    const url = req.url;
    const method = req.method;

    const statusCode = 404;
    const message = `This ${method} to ${url} is not implemented!`;

    throw new CustomError(statusCode, message);
  } catch (error) {
    next(error);
  }
});




app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  const resData = new ResData(statusCode, message);

  res.status(resData.statusCode).json(resData);
});
app.listen(config.PORT, () => {
  console.log("http://localhost:" + config.PORT);
});
