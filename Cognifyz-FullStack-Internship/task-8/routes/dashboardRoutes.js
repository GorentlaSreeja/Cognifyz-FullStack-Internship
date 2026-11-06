const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();


// Dashboard
router.get("/dashboard", auth, (req, res) => {

    res.render("dashboard", {
        user: req.session.user,
        prediction: null,
        error: null
    });

});


module.exports = router;
