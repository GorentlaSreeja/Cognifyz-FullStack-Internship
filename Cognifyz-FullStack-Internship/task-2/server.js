const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Temporary Storage
let students = [];

// Home Route
app.get("/", (req, res) => {

    res.render("index", {
        students: students,
        error: null
    });

});

// Form Submission
app.post("/submit", (req, res) => {

    const fullname = req.body.fullname;
    const email = req.body.email;
    const phone = req.body.phone;
    const course = req.body.course;
    const gender = req.body.gender;

    

    if (
        fullname === "" ||
        email === "" ||
        phone === "" ||
        course === "" ||
        gender === ""
    ) {

        return res.render("index", {
            students: students,
            error: "All fields are required!"
        });

    }

    // Store Data Temporarily

    const studentData = {
        fullname,
        email,
        phone,
        course,
        gender
    };

    students.push(studentData);

    res.render("index", {
        students: students,
        error: null
    });

});

// Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});