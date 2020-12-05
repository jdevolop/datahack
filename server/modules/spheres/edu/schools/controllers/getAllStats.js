'use strict';

const getStudying = require("../filters/getAllStudying");

module.exports = {
    async allPercentLevels(ctx) {
        const data = await getStudying();


        ctx.body = { data };
    }
};