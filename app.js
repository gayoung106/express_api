const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", indexRouter);

const serverPort = process.env.PORT;
app.listen(serverPort, () => console.log("server ok"));
