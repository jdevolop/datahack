const Router = require('koa-router');

const actions = require("./controllers/action");

const router = new Router({ prefix: '/users' });

const check = require("../../handlers/checkAdmin");

router.post('/save', actions.addUser)
      .post('/get', actions.getUser);

module.exports = router.routes();
