'use strict';

const jwtService = require('../services/jwt-service');

module.exports = () => async (ctx, next) => {
  const { authorization } = ctx.headers;

  if (authorization) {
    try {
		const token = authorization.split(' ')[1];
      const { id } = await jwtService.verify(token);

      ctx.state.admin = true;
    } catch (e) {
      ctx.throw(401, { message: 'Unauthorized. Invalid Token' });
    }
  }

  await next();
};
