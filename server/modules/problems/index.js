const Router = require('koa-router');
const p_cont = require('./controllers/p-cont');
const s_cont = require('./controllers/s-cont');

const is_auth = require("../../handlers/checkAuth");
const is_user = require("../../handlers/checkUser");
const is_admin = require("../../handlers/checkAdmin");

const router = new Router({ prefix: '/problems' });

router.get('/all', is_auth(),p_cont.getProblems)
    .post('/create', is_user(), p_cont.addProblem)
    .post('/get', is_auth(), p_cont.getProblem)
    .post('/stats', is_admin(), p_cont.getProblemStats)
    .post('/sphere', is_admin(), p_cont.getProblemsBySphere)
    .post('/suggestions/create', is_user(), s_cont.addSuggestion)
    .post('/suggestions', is_auth(), s_cont.getSuggestions)
    .post('/suggestions/get', is_auth(), s_cont.getSuggestion)
    .post('/suggestions/yes', is_user(), s_cont.addYes)
    .post('/suggestions/no', is_user(), s_cont.addNo);


module.exports = router.routes();
