'use strict';

const db = require("../../db");

const TABLE_NAME = 'spheres';

class Spheres {
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
                    t.integer('opendata_id');
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
	
	async add({ name_ru, opendata_id }) {
		return await db
			.insert({ name_ru, opendata_id })
			.from(this.table);
    }
    
    async getSphereById(id) {
		return await db
			.select('id', 'name_ru', 'opendata_id')
			.from(this.table)
			.where({ id });
	}

}

const sp = new Spheres();

// sp.add({name_ru: "Энергетика", opendata_id: 12})
// .then(res=> console.log(res));

module.exports = Spheres;
