const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

// Temporary storage
let students = [];

// Home Page
app.get("/", (req, res) => {
    res.render("index", {
        students: students,
        error: "",
        success: ""
    });
});

// Register Student
app.post("/submit", (req, res) => {

    const {
        fullname,
        email,
        phone,
        age,
        city,
        course,
        gender,
        password,
        confirmPassword
    } = req.body;

    // Required Field Validation
    if (
        !fullname ||
        !email ||
        !phone ||
        !age ||
        !city ||
        !course ||
        !gender ||
        !password ||
        !confirmPassword
    ) {
        return res.render("index", {
            students,
            error: "Please fill all fields.",
            success: ""
        });
    }

    // Name Validation
    const nameRegex = /^[A-Za-z ]+$/;

    if (!nameRegex.test(fullname)) {
        return res.render("index", {
            students,
            error: "Name should contain only alphabets.",
            success: ""
        });
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.render("index", {
            students,
            error: "Invalid Email Address.",
            success: ""
        });
    }

    // Phone Validation
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
        return res.render("index", {
            students,
            error: "Phone number must contain exactly 10 digits.",
            success: ""
        });
    }

    // Password Length
    if (password.length < 8) {
        return res.render("index", {
            students,
            error: "Password must be at least 8 characters.",
            success: ""
        });
    }

    // Password Match
    if (password !== confirmPassword) {
        return res.render("index", {
            students,
            error: "Passwords do not match.",
            success: ""
        });
    }

    // Store Student
    students.push({
        fullname,
        email,
        phone,
        age,
        city,
        course,
        gender
    });

    res.render("index", {
        students,
        error: "",
        success: "🎉 Student Registered Successfully!"
    });

});

// Start Server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});






