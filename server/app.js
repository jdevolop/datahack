'use strict';

const Koa = require('koa');
// const modules = require('./modules');
const path = require('path');
const Router = require('koa-router');
const initHandlers = require('./handlers');

const app = new Koa();
const client = new Router();

initHandlers(app);

// app.use(modules);


module.exports = app;
