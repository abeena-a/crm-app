const mongoose = require("mongoose");

const customerSchema =
 new mongoose.Schema({
   name: String,
   email:{
    type: String,
    required: true,
    unique : true
   },
   phone: String,
   company: String
 });

module.exports =
 mongoose.model(
  "Customer",
  customerSchema
);