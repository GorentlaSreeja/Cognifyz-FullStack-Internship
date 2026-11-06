require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;



mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



// Home Page
app.get("/", (req, res) => {
    res.redirect("/login");
});

// Register Page
app.get("/register", (req, res) => {
    res.render("register", {
        message: ""
    });
});

// Login Page
app.get("/login", (req, res) => {
    res.render("login", {
        message: ""
    });
});

// Dashboard
app.get("/dashboard", (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    res.render("dashboard", {
        user: req.session.user
    });

});



app.post("/register", async (req, res) => {

    try {

        const { fullname, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.render("register", {
                message: "Email already exists!"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({

            fullname,
            email,
            password: hashedPassword

        });

        await user.save();

        res.redirect("/login");

    } catch (err) {

        console.log(err);

    }

});



app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.render("login", {
                message: "Invalid Email"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.render("login", {
                message: "Invalid Password"
            });

        }

        req.session.user = user;

        res.redirect("/dashboard");

    } catch (err) {

        console.log(err);

    }

});



app.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.redirect("/login");

    });

});



app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});