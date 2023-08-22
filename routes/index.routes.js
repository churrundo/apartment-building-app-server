const express = require("express");
const router = express.Router();

const authRoutes = require('./auth.routes');
router.use('/auth', authRoutes);

const userRoutes = require('./users.routes');
router.use('/users', userRoutes);

const announcementRoutes = require('./announcements.routes');
router.use('/announcements', announcementRoutes);

const pollRoutes = require('./polls.routes');
router.use('/polls', pollRoutes);

const directoryRoutes = require('./directory.routes');
router.use('/directory', directoryRoutes);

const complaintsRoutes = require('./complaints.routes');
router.use('/complaints', complaintsRoutes);

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
