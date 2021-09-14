const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.text({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const userRoutes = require("./modules/routes");

app.use("/api/v1/user", userRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`app is listening to port ${port}`);
});
app.timeout = 21000;

module.exports = app;
