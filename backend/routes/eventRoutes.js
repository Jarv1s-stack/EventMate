const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authenticateToken = require('../middleware/auth');


// Все актуальные события
router.get('/', eventController.getEvents);

// Получить одно событие по id
router.get('/:id', eventController.getEventById);

// Создать событие (только авторизованный)
router.post('/', authenticateToken, eventController.createEvent);

// Удалить событие (только создатель)
router.delete('/:id', authenticateToken, eventController.deleteEvent);

// Присоединиться к событию
router.post('/:id/join', authenticateToken, eventController.joinEvent);

// Получить участников события
// router.get('/:id/participants', authenticateToken, eventController.getEventParticipants);

module.exports = router;
