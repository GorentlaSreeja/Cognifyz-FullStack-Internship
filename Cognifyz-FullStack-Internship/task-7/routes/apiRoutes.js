const express = require("express");
const auth = require("../middleware/auth");
const { getNationality } = require("../services/nationalityService");

const router = express.Router();


// Nationality Prediction
router.post("/predict", auth, async (req, res) => {

    try {

        const { name } = req.body;

        const prediction = await getNationality(name);

        res.render("dashboard", {
            user: req.session.user,
            prediction,
            error: null
        });

    } catch (err) {

        res.render("dashboard", {
            user: req.session.user,
            prediction: null,
            error: err.message
        });

    }

});


module.exports = router;