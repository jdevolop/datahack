'use strict';
module.exports = () => async (ctx, next) => {
		if (!ctx.state.user) {
			ctx.throw(403, 'Forbidden');
		} 
		await next();
};
