const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as view engine
app.set("view engine", "ejs");

// Home Route
app.get("/", (req, res) => {
    res.render("index", {
        student: null
    });
});

// Form Submission Route
app.post("/submit", (req, res) => {

    const studentData = {
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        course: req.body.course,
        gender: req.body.gender
    };

    res.render("index", {
        student: studentData
    });
});

// Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});