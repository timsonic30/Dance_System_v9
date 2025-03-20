//抓出工具
const express = require("express");
const router = express.Router();
const DanceClass = require("../models/danceClass");
const Teacher = require("../models/teacher");
const Transaction = require("../models/transaction");
const Authorization = require("../middlewares/authorization");
//交給前端class資料
router.get("/", async (req, res, next) => {
  try {
    let classData = await DanceClass.find({}).exec();
    //console.log(classData);
    return res.send({ classData });
  } catch (e) {
    return res.send(e);
  }
});

//====20250313 start==============================
router.get("/classCreate", async (req, res, next) => {
  try {
    let classData = await DanceClass.findOne().exec();
    return res.send({ classData });
  } catch (e) {
    return res.send(e);
  }
});

// 返回collection的schema結構
router.get("/schema", (req, res, next) => {
  const schema = DanceClass.schema.paths;
  res.send({ schema });
});

//從前端到來的資料, 放入danceClass collection中
router.post("/classCreate", async (req, res, next) => {
  const {
    code,
    type,
    style,
    teacher,
    vacancy,
    status,
    level,
    date,
    startTime,
    endTime,
    description,
    price,
    lessonDuration,
    room,
    performanceDay,
    img,
  } = req.body;

  const newDanceClass = new DanceClass({
    code,
    type,
    style,
    teacher,
    vacancy,
    status,
    level,
    date,
    startTime,
    endTime,
    description,
    price,
    lessonDuration,
    room,
    performanceDay,
    img,
  });

  newDanceClass
    .save()
    .then((savedDoc) => {
      console.log("儲存完畢, 資料是:");
      console.log(savedDoc);
      res.send({ response: "ok" });
    })
    .catch((e) => {
      console.log(e);
    });
});

//=======20250314================================
router.get("/roomRental", (req, res, next) => {});
//======20250314=15:00=取出DB的schema做form==========
router.get("/teacherDataEntry", (req, res, next) => {
  const schema = Teacher.schema.paths;
  res.send({ schema });
});
//========將teacher的資料輸入DB=====================
router.post("/teacherDataEntry", (req, res, next) => {
  //console.log(req.body)
  const {
    username,
    nickname,
    email,
    phone,
    password,
    dateOfBirth,
    description,
    style,
    instagram,
    profilePic,
  } = req.body;

  const newTeacher = new Teacher({
    username,
    nickname,
    email,
    phone,
    password,
    dateOfBirth,
    description,
    style,
    instagram,
    profilePic,
  });

  newTeacher
    .save()
    .then((savedDoc) => {
      console.log("儲存完畢, 資料是:");
      console.log(savedDoc);
      res.send({ response: "ok" });
    })
    .catch((e) => {
      console.log(e);
    });
});
//========向teacher collection取出teacher資料
router.get("/tutor", async (req, res, next) => {
  try {
    let Teachers = await Teacher.find({}).exec();
    return res.send({ Teachers });
  } catch (e) {
    console.error("Error during database operation:", e.message);
    return res.status(500).send({ error: e.message });
  }
});
//========向teacher collection取出teacher資料
router.get("/tutorOne", async (req, res, next) => {
  try {
    let oneTeacher = await Teacher.findOne({}).exec();
    return res.send({ oneTeacher });
  } catch (e) {
    console.error("Error during database operation:", e.message);
    return res.status(500).send({ error: e.message });
  }
});
//========向teacher collection取出某一老師資料資料
router.get("/tutor/:id", async (req, res, next) => {
  try {
    const tutorId = req.params.id; // 提取路徑參數 id
    console.log(tutorId);
    const someOneTeacher = await Teacher.findById(tutorId).exec(); // 假設用 ID 查找
    return res.send({ someOneTeacher });
  } catch (e) {
    console.error("Error during database operation:", e.message);
    return res.status(500).send({ error: e.message });
  }
});
//========向danceClass collection取出某個老師的課程
router.get("/:tutorid", async (req, res, next) => {
  try {
    const tutorId = req.params.tutorid;
    const tutorClass = await DanceClass.find({ teacher: tutorId }).exec();
    return res.send({ tutorClass });
  } catch (e) {
    console.error("Error during database operation (/:tutorid):", e.message);
    return res.status(500).send({ error: e.message });
  }
});
//=============向transaction collection取出某個會員的資料
// router.get("/transaction/:userId", async (req, res, next) => {
//   try {
//     const userId = req.params.userId;
//     const userTransactions = await Transaction.find({ userId: userId }).exec();
//     return res.send({ userTransactions });
//   } catch (e) {
//     console.error("Error during database operation (/:tutorid):", e.message);
//     return res.status(500).send({ error: e.message });
//   }
// });

router.post("/transaction", Authorization, async (req, res, next) => {
  try {
    const userId = req.body.objectId;
    console.log(userId);
    const userTransactions = await Transaction.find({ userId: userId }).exec();
    return res.send({ userTransactions });
  } catch (e) {
    console.error("Error during database operation (/:tutorid):", e.message);
    return res.status(500).send({ error: e.message });
  }
});

router.delete("/transactionDelete/:id", async (req, res, next) => {
  try {
    const transactionId = req.params.id;
    const deletedDoc = await Transaction.findByIdAndDelete(
      transactionId
    ).exec();
    console.log("刪除完畢, 資料是:"); // 確認刪除成功
    console.log(deletedDoc); // 確認刪除成功
    res.send({ response: "ok", deletedDoc }); // 回傳成功訊息
  } catch (e) {
    console.error("刪除失敗，錯誤訊息:", e); // 捕捉錯誤並回傳錯誤訊息
    res.status(500).send({ response: "error" });
  }
});

//export此module到index.js
//index.js要用const danceClass = require("./routes/danceClass");接收
//index.js要用app.use("/danceClass", danceclass);將request轉過來
module.exports = router;
