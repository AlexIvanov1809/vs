const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    path: {
      type: String,
      require: true,
    },
  },
  {
    timestamos: true,
  }
);

module.exports = model("Images", schema);
