const express = require('express');
const { getStats } = require('../../lib/stats');

const router = express.Router();

router.get('/', (req, res) => {
  const stats = getStats();
  res.json({
    success: true,
    total: stats.total,
    today: stats.today,
    tempmailUsed: stats.tempmailUsed,
    tempmailLeft: stats.tempmailLeft,
    tempmailTotal: 30,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;