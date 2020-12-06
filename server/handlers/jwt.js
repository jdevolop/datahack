'use strict';

const jwtService = require('../services/jwt-service');
const Admins = require("../modules/organizations/models/OrganizationAdmins");
const admins = new Admins();

module.exports = () => async (ctx, next) => {
  const { authorization } = ctx.headers;

  if (authorization) {
    try {
		const token = authorization.split(' ')[1];
      const { id } = await jwtService.verify(token);
      const is_admin = await admins.getAdminById(id);
      if (!is_admin.length) {
        ctx.state.admin = false;
        ctx.state.user = true;
        ctx.state.user_id = id;
      } else {
        ctx.state.admin = true;
        ctx.state.user = false;
        ctx.state.admin_id = id;
      }
    } catch (e) {
      ctx.throw(401, { message: 'Unauthorized. Invalid Token' });
    }
  }

  await next();
};
