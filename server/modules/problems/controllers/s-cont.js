'use strict';

const AppError = require("../../../helpers/appError");
const Suggestions = require("../models/Suggestions");
const Users = require("../../users/models/Users");
const Problems = require("../models/Problems");
const suggestions = new Suggestions();
const users = new Users();

module.exports = {
    async addSuggestion(ctx) {
        const {
            description,
            problem_id,
        } = ctx.request.body;
        try {
            if (ctx.state.user_id) {
                const ids = await suggestions.add({description, problem_id, user_id: ctx.state.user_id});
                ctx.body = {
                    id: ids[0],
                    success: true,
                };
            } else {
                ctx.status = 400;
                ctx.body = {success: false};
            }
        } catch (e) {
            console.log(e);
			throw new AppError({ status: 400, ...e });
        }
    },

    async getSuggestions(ctx) {
        const {
            problem_id
        } = ctx.request.body;
        try {
            const sugs = await suggestions.getSuggestions(problem_id);
            if (sugs.length) {
                for (const sug of sugs) {
                    const user = await users.getUserDbById(sug.user_id);
                    sug['user'] = user[0];
                }
            }
            ctx.body = sugs;
        } catch (e) {
            console.log(e);
			throw new AppError({ status: 400, ...e });
        }
    },

    async getSuggestion(ctx) {
        const {
            id
        } = ctx.request.body;
        try {
            const sug = await suggestions.getSuggestionById(id)
            if (sug.length) {
                const user = await users.getUserDbById(sug[0].user_id);
                sug[0]['user'] = user[0];
                ctx.body = sug[0];
            } else {
                ctx.status = 404;
                ctx.body = sug;
            }
        } catch (e) {
            console.log(e);
			throw new AppError({ status: 400, ...e });
        }
    },

    async addYes(ctx) {
        const {
            suggestion_id
        } = ctx.request.body;

        try {
            const sug = await suggestions.getSuggestionById(suggestion_id);
            if (sug.length) {
                const current_yes = sug[0].yes + 1;
                const ok = await suggestions.updateSuggestionYes(suggestion_id, current_yes, ctx.state.user_id)
                if (ok) {
                    ctx.body = {
                        suggestion_id,
                        success: true
                    };
                } else {
                    ctx.body = {
                        suggestion_id,
                        success: false
                    };
                }
                
            } else {
                ctx.status = 404;
                ctx.body = {success: false};

            }


        } catch (e) {
            console.log(e);
            throw new AppError({ status: 400, ...e });
        }

    },

    async addNo(ctx) {
        const {
            suggestion_id
        } = ctx.request.body;

        try {

            const sug = await suggestions.getSuggestionById(suggestion_id);
            if (sug.length) {
                const current_no = sug[0].no + 1;
                const ok = await suggestions.updateSuggestionNo(suggestion_id, current_no, ctx.state.user_id)
                if (ok) {
                    ctx.body = {
                        suggestion_id,
                        success: true
                    };
                } else {
                    ctx.body = {
                        suggestion_id,
                        success: false
                    };
                }
                
            } else {
                ctx.status = 404;
                ctx.body = {success: false};

            }


        } catch (e) {
            console.log(e);
            throw new AppError({ status: 400, ...e });
        }

    }
}