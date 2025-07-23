const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

// Получить points пользователя
router.get('/:id/points', authenticateToken, userController.getPoints);

router.get('/me', authenticateToken, userController.getMyProfile);

module.exports = router;
