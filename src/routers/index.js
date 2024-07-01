const { Router } = require('express');
// ============================
const actorRouter = require('./actorRouters');
const directorRouter = require('./directorRouters');
const movieRouter = require('./movieRouters');

const router = new Router();

router.use('/actors', actorRouter);
router.use('/directors', directorRouter);
router.use('/movies', movieRouter);

module.exports = router;
