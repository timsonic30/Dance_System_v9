const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Member = require("../models/member");
const Transaction = require("../models/transaction");
const DanceClass = require("../models/danceClass");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const Authorization = require("../middlewares/authorization");

router.post("/information", Authorization, async (req, res, next) => {
  try {
    const user = await Member.findOne({ _id: new ObjectId(req.body.objectId) });
    console.log(user);
    return res.json({
      username: user.username,
      phone: user.phone,
      email: user.email,
      gender: user.gender,
      birthday: user.dateOfBirth,
      point: user.point,
    });
  } catch (err) {
    throw new Error("Server Error");
  }
});

router.post("/edit", Authorization, async (req, res, next) => {
  const { editField, editValue, objectId } = req.body;
  const updateObject = { [editField]: editValue, updatedAt: new Date() };
  console.log(updateObject);
  try {
    const user = await Member.updateOne(
      { _id: new ObjectId(objectId) },
      { $set: updateObject }
    );
    console.log(user);
    return res.send(`Successfully update ${editField}`);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/getClassList", Authorization, async (req, res, next) => {
  const { objectId } = req.body;
  const regular = [],
    workshop = [],
    popUp = [],
    showcase = [];
  try {
    const classInfo = await Transaction.aggregate([
      {
        $match: {
          userId: objectId,
          type: "Class",
        },
      },
      {
        $lookup: {
          from: "danceclasses",
          let: { classId: { $toObjectId: "$detail" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$classId"] },
              },
            },
          ],
          as: "classDetails",
        },
      },
      {
        $unwind: {
          path: "$classDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          type: 1,
          detail: 1,
          userId: 1,
          price: 1,
          status: 1,
          classCode: "$classDetails.code",
          classType: "$classDetails.type",
          classStyle: "$classDetails.style",
          classTeacher: "$classDetails.teacher",
        },
      },
    ]);

    for (let classItem of classInfo) {
      // if (classItem.classType.toLowerCase().include(regular))
      //   regular.push(classItem);
      if (classItem.classType.toLowerCase().search("regular") !== -1)
        regular.push(classItem);
      else if (classItem.classType.toLowerCase().search("workshop") !== -1)
        workshop.push(classItem);
      else if (classItem.classType.toLowerCase().search("pop up") !== -1)
        popUp.push(classItem);
      else if (classItem.classType.toLowerCase().search("showcase") !== -1)
        showcase.push(classItem);
    }
    return res.send({ regular, workshop, popUp, showcase });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
