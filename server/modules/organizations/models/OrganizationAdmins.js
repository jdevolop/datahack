'use strict';

const db = require("../../db");

const TABLE_NAME = 'organization_admins';

class OrganizationAdmins {
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
                    t.integer('organization_id').references('id').inTable('organizations').notNull().onDelete('cascade');
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

    async add({ organization_id, user_id }) {
		return await db
			.insert({ organization_id, user_id })
			.from(this.table);
    }
    
    async getAdminById(user_id) {
		return await db
			.select('id', 'organization_id', 'user_id')
			.from(this.table)
			.where({ user_id });
	}

}

const oa = new OrganizationAdmins();

// oa.add({organization_id: 2, user_id: 6})
// .then(res=> console.log(res));

module.exports = OrganizationAdmins;