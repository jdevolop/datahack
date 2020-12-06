const Router = require('koa-router');

const spheres = require("./spheres");
const users = require("./users");
const problems = require("./problems");

const router = new Router({ prefix: '/api' });

router.use(spheres);
router.use(users);
router.use(problems);


module.exports = router.routes();

