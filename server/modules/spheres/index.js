const Router = require('koa-router');
const cont = require("./edu/schools/controllers/getAllStats")

const router = new Router({ prefix: '/spheres' });

router.get('/edu/schools', cont.allPercentLevels);

module.exports = router.routes();
