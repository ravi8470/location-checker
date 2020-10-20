const mongoose = require("mongoose");
const bcrypt = require('mongoose-bcrypt');

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      bcrypt: true
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

UserSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.password
  return obj
}

UserSchema.plugin(bcrypt);

const User = mongoose.model("User", UserSchema);

module.exports = User;