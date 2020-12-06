'use strict';

const Users = require("../models/Users");
const users = new Users();
const AppError = require("../../../helpers/appError");
const Admins = require("../../organizations/models/OrganizationAdmins");
const jwt = require("../../../services/jwt-service");
const admins = new Admins();    

module.exports = {
    async addUser(ctx) {
        const {
            id,
            hash,
            authdate,
            username,
            lastname,
            firstname,
            photourl
        } = ctx.request.body;
        try {
            const user_ = await users.getUserById(id);
            let tg_id = id;
            if (!user_.length) {
                const user = await users.add({ 
                    tg_id, 
                    first_name: firstname || '',
                    last_name: lastname || '',
                    username: username || '',
                    photo_url: photourl || '',
                });
                const id = user[0];
                const authToken = jwt.getToken({ id }, { expiresIn: '20h' });
                const authLine = `Bearer ${authToken}`;
    
                ctx.body = {
                    user_id: user[0],
                    token: authLine,
                };


            } else {
                const id = user_[0].id;
                const authToken = jwt.getToken({ id }, { expiresIn: '20h' });
                const authLine = `Bearer ${authToken}`;

                const is_admin = await admins.getAdminById(id);
                const res = {
                    user_id: id,
                    token: authLine,
                };
                if (is_admin.length) {
                    res['admin'] = true;
                }
                ctx.body = res

            }
            
            
        } catch (e) {
            console.log(e);
			throw new AppError({ status: 400, ...e });
        }
    },

    async getUser(ctx) {
        const {user_id} = ctx.request.body;
        try {
            const user = await users.getUserById(user_id);
            

            ctx.body = {data: user[0]};
        } catch (e) {
            console.log(e);

			throw new AppError({ status: 404, ...e });
        }
    }
}