const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Temporary Data Storage
let students = [];

// Home Page
app.get("/", (req, res) => {
    res.render("index");
});

// =================== API ===================

// Get all students
app.get("/api/students", (req, res) => {
    res.json(students);
});

// Add a student
app.post("/api/students", (req, res) => {

    const {
        fullname,
        email,
        phone,
        age,
        city,
        course,
        gender
    } = req.body;

    const student = {
        id: Date.now(),
        fullname,
        email,
        phone,
        age,
        city,
        course,
        gender
    };

    students.push(student);

    res.status(201).json(student);
});

// Update a student
app.put("/api/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students[index] = {
        ...students[index],
        ...req.body
    };

    res.json(students[index]);
});

// Delete a student
app.delete("/api/students/:id", (req, res) => {

    const id = Number(req.params.id);

    students = students.filter(student => student.id !== id);

    res.json({
        message: "Student deleted successfully"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});







