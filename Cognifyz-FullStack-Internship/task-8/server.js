require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const rateLimit = require("express-rate-limit");

const logger = require("./middleware/logger");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();

const PORT = process.env.PORT || 3000;



// MongoDB Connection

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));



// Middleware

app.use(logger);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(session({

    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false

}));



// Rate Limiter

const limiter = rateLimit({

    windowMs: 60 * 1000,

    max: 20,

    message: "Too many requests. Please try again after one minute."

});

app.use(limiter);



// View Engine

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));



// Home Route

app.get("/", (req, res) => {

    res.redirect("/login");

});



// Routes

app.use(authRoutes);

app.use(dashboardRoutes);

app.use(apiRoutes);



// Server

app.listen(PORT, () => {

    console.log(`🚀 Server running at http://localhost:${PORT}`);

});