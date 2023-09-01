const express = require("express");
const router = express.Router();

const userRoutes = require('./users.routes');
router.use('/users', userRoutes);

const announcementRoutes = require('./announcements.routes');
router.use('/announcements', announcementRoutes);

const pollRoutes = require('./polls.routes');
router.use('/polls', pollRoutes);

const complaintsRoutes = require('./complaints.routes');
router.use('/complaints', complaintsRoutes);

module.exports = router;
