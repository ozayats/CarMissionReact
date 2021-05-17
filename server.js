const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
require("dotenv").config();

const globalConfigs = require("./routes/globalConfigs");
const sectionsMainPage = require("./routes/sectionsMainPages");
const reviews = require("./routes/reviews");
const blogs = require("./routes/blogs");
const workStages = require("./routes/workStages");
const servicePackages = require("./routes/servicePackages");
const features = require("./routes/features");
const navbar = require("./routes/navbar");
const logo = require("./routes/logo");
const socialNetworks = require("./routes/socialNetworks");
const feedbacks = require("./routes/feedbacks");
const adminUsers = require("./routes/adminUsers");
const invites = require("./routes/invites");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes

app.use("/api/configs", globalConfigs);
app.use("/api/admin-users", adminUsers);
app.use("/api/sections-main", sectionsMainPage);
app.use("/api/reviews", reviews);
app.use("/api/blogs", blogs);
app.use("/api/work-stages", workStages);
app.use("/api/navbar", navbar);
app.use("/api/logo", logo);
app.use("/api/service-packages", servicePackages);
app.use("/api/features", features);
app.use("/api/social-networks", socialNetworks);
app.use("/api/feedbacks", feedbacks);
app.use("/api/invites", invites);

// Set static folder
app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
