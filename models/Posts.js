const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  dateCreate: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: String,
  },
});

module.exports =  mongoose.model("Posts" , PostSchema)