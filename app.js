require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const initializeFirebase = require("./constants/firebase-config");

initializeFirebase();
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/", require("./routes"));

app.listen(process.env.APP_PORT, () => {
    console.log("Server is running on", process.env.APP_PORT);
});
