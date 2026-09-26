const express = require("express");
const router = express.Router();

const {
    createIdea
} = require("../controllers/ideaController");


router.post("/validate", createIdea);

module.exports = router;