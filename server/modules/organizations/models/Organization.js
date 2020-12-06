'use strict';

const db = require("../../db");

const TABLE_NAME = 'organizations';

class Organizations {
    constructor() {
        this.table = TABLE_NAME;
    }

    static async createTable() {
        try {
			let exist = await db.schema.hasTable(TABLE_NAME);

			if (!exist) {
				await db.schema.createTable(TABLE_NAME, function(t) {
                    t.increments().primary();
                    t.string('name_ru');
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

	async add({ name_ru, sphere_id }) {
		return await db
			.insert({ name_ru, sphere_id })
			.from(this.table);
    }
    
    async getOrganizationById(id) {
		return await db
			.select('id', 'name_ru', 'opendata_id')
			.from(this.table)
			.where({ id });
	}
}

const org = new Organizations();

// org.add({ name_ru: "Министерство народного образования Республики Узбекистан", sphere_id: 3 })
// .then(res=>console.log(res));

module.exports = Organizations;