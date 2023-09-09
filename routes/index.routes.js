const express = require("express");
const router = express.Router();

const userRoutes = require('./users.routes');
router.use('/users', userRoutes);

const announcementRoutes = require('./announcements.routes');
router.use('/announcements', announcementRoutes);

const pollRoutes = require('./polls.routes');
router.use('/polls', pollRoutes);

const buildingsRoutes = require('./buildings.routes');
router.use('/buildings', buildingsRoutes);

module.exports = router;
