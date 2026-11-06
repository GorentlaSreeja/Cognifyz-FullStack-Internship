const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { sendWelcomeEmail } = require("../services/backgroundJob");

const router = express.Router();


// Register Page
router.get("/register", (req, res) => {

    res.render("register", {
        message: ""
    });

});


// Login Page
router.get("/login", (req, res) => {

    res.render("login", {
        message: ""
    });

});


// Register User
router.post("/register", async (req, res) => {

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

        // Background Job
        sendWelcomeEmail(email, fullname);

        res.redirect("/login");

    }

    catch (err) {

        console.log(err);

        res.render("register", {
            message: "Something went wrong!"
        });

    }

});


// Login User
router.post("/login", async (req, res) => {

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

    }

    catch (err) {

        console.log(err);

        res.render("login", {
            message: "Something went wrong!"
        });

    }

});


// Logout
router.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.redirect("/login");

    });

});


module.exports = router;