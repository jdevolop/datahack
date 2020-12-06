'use strict';

const db = require("../../db")

const TABLE_NAME = 'problems';

class Problems {
    constructor() {
        this.table = TABLE_NAME;
    }

    static async createTable() {
        try {
			let exist = await db.schema.hasTable(TABLE_NAME);

			if (!exist) {
				await db.schema.createTable(TABLE_NAME, function(t) {
                    t.increments().primary();
                    t.text('description');
                    t.integer('user_id').references('id').inTable('users').notNull().onDelete('cascade');
                    t.integer('sphere_id').references('id').inTable('spheres').notNull().onDelete('cascade');
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


    async add({ description, user_id, sphere_id }) {
		return await db
			.insert({ description, user_id, sphere_id })
			.from(this.table);
    }
    
    async getProblemById(id) {
		return await db
			.select('id', 'description', 'user_id', 'sphere_id')
			.from(this.table)
			.where({ id });
    }
    
    async getProblems() {
		return await db
			.select('id', 'description', 'user_id', 'sphere_id')
			.from(this.table);
	}
}

module.exports = Problems;
