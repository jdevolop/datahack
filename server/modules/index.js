const Router = require('koa-router');

const spheres = require("./spheres");
const users = require("./users");

const router = new Router({ prefix: '/api' });

router.use(spheres);
router.use(users);


module.exports = router.routes();

