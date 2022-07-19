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
    type: Image,
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

module.exports =  ("Posts" , PostSchema)