'use strict';

const AppError = require("../../../helpers/appError");
const Problems = require("../models/Problems");
const Users = require("../../users/models/Users");
const Spheres = require("../../spheres/models/Spheres");
const problems = new Problems();
const users = new Users();
const spheres = new Spheres();

module.exports = {
    async addProblem(ctx) {
        const {
            description
        } = ctx.request.body;
        try {
            if (ctx.state.user_id) {
                const ids = await problems.add({description, user_id: ctx.state.user_id, sphere_id: 3});
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

    async getProblems(ctx) {
        try {
            const prob = await problems.getProblems();
            for (const p of prob) {
                const user = await users.getUserDbById(p.user_id);
                const sp_name = await spheres.getSphereById(p.sphere_id);
                p['user'] = user[0];
                p['sphere'] = sp_name[0].name_ru;
            }
            ctx.body = prob;
        } catch (e) {
            console.log(e);
			throw new AppError({ status: 400, ...e });
        }
    },

    async getProblemsBySphere(ctx) {
        const {
            sphere_id,
        } = ctx.request.body;
        try {
            const prob = await problems.getProblemsBySphere(sphere_id);
            for (const p of prob) {
                const user = await users.getUserDbById(p.user_id);
                const sp_name = await spheres.getSphereById(p.sphere_id);
                p['user'] = user[0];
                p['sphere'] = sp_name[0].name_ru;
            }
            ctx.body = prob;
        } catch (e) {
            console.log(e);
			throw new AppError({ status: 400, ...e });
        }
    },

    async getProblemStats(ctx) {
        const {
            sphere_id,
        } = ctx.request.body;
        try {
            const count_by_user_sphere = await problems.getProblemsCountByUsers(sphere_id);
            const sphere = await spheres.getSphereById(sphere_id)
            if (sphere.length) {

                ctx.body = {
                    title: "Количество пользователей отправивших заявки по сфере " + sphere[0].name_ru,
                    count: count_by_user_sphere[0]['count(`user_id`)']
                };
            } else {
                ctx.body = {};
            }
        } catch (e) {
            console.log(e);
			throw new AppError({ status: 400, ...e });
        }
    },

    async getProblem(ctx) {
        const {
            problem_id
        } = ctx.request.body;
        try {
            const prob = await problems.getProblemById(problem_id)
            if (prob.length) {
                const user = await users.getUserDbById(prob[0].user_id);
                const sp_name = await spheres.getSphereById(prob[0].sphere_id);
                prob[0]['user'] = user[0];
                prob[0]['sphere'] = sp_name[0].name_ru;
                 ctx.body = prob[0];
            } else {
                ctx.status = 404;
                ctx.body = prob;
            }
        } catch (e) {
            console.log(e);
			throw new AppError({ status: 400, ...e });
        }
    },
}