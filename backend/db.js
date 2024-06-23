const mongoose = require("mongoose");

const Connection = async () => {
  mongoose
    .connect(`mongodb://127.0.0.1:27017/paytm`)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
};

module.exports = {
  Connection,
};
