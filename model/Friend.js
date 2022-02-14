const mongoose = require("mongoose");
const friendSchema = new mongoose.Schema({
    id: {
      type: Number,
      unique: true
    },
    name: {
      type: String,
      unique: true
    },
  
},{
  collection:'friendSchema',
  versionKey: false,
});

  module.exports = mongoose.model("Friend", friendSchema);
