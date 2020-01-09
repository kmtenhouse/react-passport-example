const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const helmet = require("helmet");

//require environment variables and immediately configure them
require("dotenv").config();

//require our specific configuration of passport
const passport = require("./config/passport");

//set up our port and begin an express app
const PORT = process.env.PORT || 3001;
const app = express();

// Security zone!
// Ensure we only access the application via https in production:
if (process.env.NODE_ENV === "production") {
  app.use(helmet.hsts());
}

//Set up our session
const sessionConfig = {
/*   store: sessionStore, */
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {},
  name: "id" //make session cookie name generic so it's harder to tell what tech we are using
};

//In production, ensure we are using secure cookies for our session!
if (process.env.NODE_ENV === 'production') {
  sessionConfig.cookie.secure = true;  // serve secure cookies
  sessionConfig.cookie.httpOnly = true; // ensure front end js cannot touch cookie 
}

app.use(session(sessionConfig));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Initialize passport 
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactpassportexampledb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Define API routes here
const routes = require("./routes");
app.use(routes);

// Default behavior: send every unmatched route request to the React app (in production)
app.get("*", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.sendFile(path.join(__dirname, "./client/build/index.html"));
  }
  res.status(500).send("This route does not exist!");
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
