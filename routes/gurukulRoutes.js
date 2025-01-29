const express = require("express");
const { getSanatanDharmaCategories, addSanatanDharmaCategory } = require("../controllers/gurukulController");
const router = express.Router();

router.get("/learn-sanatan-dharma", getSanatanDharmaCategories);
router.post("/learn-sanatan-dharma", addSanatanDharmaCategory);

module.exports = router;

