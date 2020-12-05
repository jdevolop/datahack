const Router = require('koa-router');

const router = new Router({ prefix: '/organizations' });

// router.post('/search', awsConroller.search)

module.exports = router.routes();
