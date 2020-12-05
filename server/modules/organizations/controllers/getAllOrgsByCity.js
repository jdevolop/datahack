'use strict';


modulee.exports = {
    async description(ctx) {
        const { query } = ctx.request.body;
        
        ctx.body = { data };
    }
}