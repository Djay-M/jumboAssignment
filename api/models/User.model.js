const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const bufferLength = 10;
const UsersSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UsersSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, bufferLength);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

UsersSchema.methods.validatePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    return error;
  }
};

const Users = mongoose.model("Users", UsersSchema);
module.exports = Users;
