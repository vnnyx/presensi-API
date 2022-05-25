require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");

const restResponse = require("express-rest-response");
const options = {
  showStatusCode: true,
  showDefaultMessage: false,
};

const db = require("./models");

app.use(cors());

app.use(restResponse(options));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/studygroup", require("./routers/studyGroupRouter"));
app.use("/user", require("./routers/userRouter"));
app.use("/presensi", require("./routers/presensiRouter"));

app.use((req, res, next) => {
  const err = new Error("");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.rest.notFound("End point not found");
  } else {
    res.rest.serverError(err.message || "Internal server error");
  }
});

const dbOptions = {
  alter: true,
  //force: true,
};

const port = process.env.PORT || 8888;

db.sequelize.sync(dbOptions).then(() => {
  app.listen(port, () => {
    console.log(`listening on: http://localhost:${port}`);
  });
  // require("./bot");
});
