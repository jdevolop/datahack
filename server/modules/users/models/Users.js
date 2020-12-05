'use strict';

const db = require("../../db");

const TABLE_NAME = 'users';

class Users {
    constructor() {
        this.table = TABLE_NAME;
    }

    static async createTable() {
        try {
			let exist = await db.schema.hasTable(TABLE_NAME);

			if (!exist) {
				await db.schema.createTable(TABLE_NAME, function(t) {
                    t.increments().primary();
                    t.integer('tg_id');
                    t.string('first_name');
                    t.string('last_name');
                    t.string('username');
                    t.text('photo_url');
                    t.timestamps();
				});
				return console.log(TABLE_NAME + ' created');
			} else {
				return console.error(TABLE_NAME + ' is already exist');
			}
		} catch (e) {
			return console.error(e);
		}
    }

    async add({ tg_id, first_name, last_name, username, photo_url}) {
		return await db
			.insert({ tg_id, first_name, last_name, username, photo_url })
			.from(this.table);
    }
    
    async getUserById(tg_id) {
		return await db
			.select('id', 'tg_id', 'first_name', 'last_name', 'username', 'photo_url')
			.from(this.table)
			.where({ tg_id });
	}

}

module.exports = Users;