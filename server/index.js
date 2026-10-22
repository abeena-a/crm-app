require("dotenv").config();

const express = require("express");
const cors = require("cors");

const dbConnection = require("./config/db");

const app = express();

dbConnection();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;


app.use( "/api/auth",  require("./routes/authRoutes"));

app.use( "/api/customers",  require("./routes/customerRoutes"));


app.listen(PORT, () => {
  console.log(
    `Server Running on ${PORT}`
  );
});