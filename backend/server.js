require("dotenv").config();
const express = require("express");
const flash = require("express-flash");
const app = express();
const { urlencoded } = require("express");
const port = 8000;
const cors = require("cors");
const spotify = require("./routes/spotify");
require("./config/prismaConfig");

app.use(cors());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(flash());

app.get("/", (req, res) => {
  res.json({ info: "Node app" });
});

// app.use('/v1/users', users);
// app.use('/v1/entries', entries);
app.use("/v1/users", require("./controller/userController"));
app.use("/v1/entries", require("./controller/entryController"));
app.use("/v1/login", require("./controller/loginController"));
app.use("/v1/spotify", spotify);

app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
