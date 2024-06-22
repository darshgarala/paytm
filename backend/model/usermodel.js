const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
});

const user = mongoose.model("user", userSchema);

export default user;
