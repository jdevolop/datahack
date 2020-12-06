'use strict';

const db = require("../../db")

const TABLE_NAME = 'votes';

class Votes {
    constructor() {
        this.table = TABLE_NAME;
    }

    static async createTable() {
        try {
			let exist = await db.schema.hasTable(TABLE_NAME);

			if (!exist) {
				await db.schema.createTable(TABLE_NAME, function(t) {
                    t.increments().primary();
                    t.integer('user_id').references('id').inTable('users').notNull().onDelete('cascade');
                    t.integer('suggestion_id').references('id').inTable('spheres').notNull().onDelete('cascade');
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


    async add({ user_id, suggestion_id }) {
		return await db
			.insert({  user_id, suggestion_id })
			.from(this.table);
    }
    
    async getById(suggestion_id, user_id) {
		return await db
			.select('id',  'user_id', 'suggestion_id')
			.from(this.table)
			.where({ suggestion_id, user_id });
	}
}

module.exports = Votes;
