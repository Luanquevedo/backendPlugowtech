const express = require('express');
const router = express.Router();
const userController = require("../controller/userController");


router.post('/registrar', userController.registerUser);

module.exports = router;