const { Router } = require('express');
// ============================
const actorRouter = require('./actorRouters');
const directorRouter = require('./directorRouters');

const router = new Router();

router.use('/actors', actorRouter);
router.use('/directors', directorRouter);

module.exports = router;
