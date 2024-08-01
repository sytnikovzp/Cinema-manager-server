const { Router } = require('express');
// ============================
const genreRouter = require('./genreRouters')
// const actorRouter = require('./actorRouters');
// const directorRouter = require('./directorRouters');
// const movieRouter = require('./movieRouters');
// const studioRouter = require('./studioRouters');

const router = new Router();

router.use('/genres', genreRouter);
// router.use('/actors', actorRouter);
// router.use('/directors', directorRouter);
// router.use('/movies', movieRouter);
// router.use('/studios', studioRouter);

module.exports = router;
