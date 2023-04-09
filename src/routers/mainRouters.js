const express = require('express');
const router = express.Router();
const mainControllers = require ('../controllers/mainControllers');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', mainControllers.index);
router.get('/contact',authMiddleware, mainControllers.contact);
router.get('/us', mainControllers.us);

module.exports = router;
