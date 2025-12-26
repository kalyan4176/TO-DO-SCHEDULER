const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/send-email', protect, sendEmail);

module.exports = router;
