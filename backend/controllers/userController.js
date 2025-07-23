const pool = require('../config/db');

exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      'SELECT id, username, email, points, avatar, created_at FROM users WHERE id = $1',
      [userId]
    );
    if (!result.rows.length) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};



exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await pool.query(
      'SELECT id, username, email, points, avatar, created_at FROM users WHERE id = $1',
      [userId]
    );
    if (!result.rows.length) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json(result.rows[0]);
  } catch (e) {
    console.error("Get user profile error:", e);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};


exports.getPoints = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await pool.query('SELECT points FROM users WHERE id = $1', [userId]);
    if (!result.rows.length) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json({ points: result.rows[0].points });
  } catch (e) {
    console.error("Get user points error:", e);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};


