const express = require("express");
const router = express.Router();
const {getAllProperties, createProperty} = require("../controllers/propertyController");

router.get('/', getAllProperties);
router.post('/', createProperty);

module.exports = router;