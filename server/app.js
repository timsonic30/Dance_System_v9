const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
app.use(logger("dev"));

const port = process.env.PORT || 3030;

const indexRouter = require("./routes/index"); // The location of the file
const memberRouter = require("./routes/member"); // The location of the file
const danceClass = require("./routes/danceclass"); //課程的資料
const teacherRouter = require("./routes/teacher"); // 老師的資料
const staffRouter = require("./routes/staff"); // 職員的資料

app.use("/", indexRouter);
app.use("/member", memberRouter);
app.use("/danceClass", danceClass);
app.use("/teacher", teacherRouter);
app.use("/staff", staffRouter);

app.listen(port, () => {
  console.log(`Server listening to ${port}`);
});
