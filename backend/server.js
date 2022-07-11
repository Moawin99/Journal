require("dotenv").config();
const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const app = express();
const { urlencoded } = require("express");
const port = 8000;
const cors = require("cors");
const spotify = require("./routes/spotify");
const passport = require("passport");
const initializePassport = require("./config/passport");
require("./config/prismaConfig");

initializePassport(passport);

app.use(cors());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

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
