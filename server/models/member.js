const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const MemberSchema = new Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  username: {
    type: String,
    default: null,
  },
  nickname: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    enum: ["F", "M",""],
    default: "",
  },
  dateOfBirth: {
    type: String,
    default: null,
  },
  status: {
    type: Boolean,
    default: false,
  },

  point: {
    type: Number,
    default: 0,
  },
  package: {
    type: Number,
    default: null,
  },
  role: {
    type: String,
    default: "member",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now, // get the timestamp
  },
});

// memberSchema.pre("save", async function (next) {
//   // Only hash the password if it has been modified (or is new)
//   if (!this.isModified("password")) {
//     return next();
//   }
//   try {
//     const hashedPassword = await bcrypt.hash(this.password, 10); // salt rounds of 10
//     console.log("The hashedPassword is :", hashedPassword);
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

MemberSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model("Member", MemberSchema);
