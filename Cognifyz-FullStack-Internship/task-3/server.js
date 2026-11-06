const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

let students = [];

// Home Page
app.get("/", (req, res) => {
    res.render("index", {
        students,
        error: null
    });
});

// Form Submission
app.post("/submit", (req, res) => {

    const {
        fullname,
        email,
        phone,
        age,
        gender,
        course,
        city
    } = req.body;

    // Server-side Validation
    if (
        !fullname ||
        !email ||
        !phone ||
        !age ||
        !gender ||
        !course ||
        !city
    ) {
        return res.render("index", {
            students,
            error: "Please fill all fields."
        });
    }

    students.push({
        fullname,
        email,
        phone,
        age,
        gender,
        course,
        city
    });

    res.redirect("/");
});

// Start Server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});