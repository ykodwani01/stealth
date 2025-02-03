const express = require('express');
const appController = require("../controllers/appController");


const router = express.Router();

router.post("/contact", appController.contact);
router.post("/book/:gameid", appController.bookSlot);

module.exports = router;