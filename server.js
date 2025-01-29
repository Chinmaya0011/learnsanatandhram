const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const gurukulRoutes = require("./routes/gurukulRoutes");
const progressRoutes = require("./routes/progressRoutes");  

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/gurukul", gurukulRoutes);
app.use("/api/progress", progressRoutes);  

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
