const express = require("express");
const bodyParser = require("body-parser");
const gurukulRoutes = require("./routes/gurukulRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/gurukul", gurukulRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server Is Running");
});
