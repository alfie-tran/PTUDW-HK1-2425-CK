const express = require('express');
const router = express.Router();
const controller = require('../controllers/threadController');
const models = require('../models');

router.get('/', controller.show);
router.get('/thread/:id', controller.showDetail);
router.post('/thread', controller.createThread);

module.exports = router;
