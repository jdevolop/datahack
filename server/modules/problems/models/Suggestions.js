'use strict';

const db = require("../../db");
const Votes = require("./Votes");

const votes = new Votes();

const TABLE_NAME = 'suggestions';

class Suggestions {
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
                    t.integer('problem_id').references('id').inTable('problems').notNull().onDelete('cascade');
                    t.integer('user_id').references('id').inTable('users').notNull().onDelete('cascade');
                    t.bigInteger("yes").defaultTo(0);
                    t.bigInteger("no").defaultTo(0);
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

    // user can vote only once
    async add({ description, problem_id, user_id }) {
		return await db
			.insert({ description, problem_id, user_id })
			.from(this.table);
    }
    
    async updateSuggestionYes(id, yes, user_id) {
        const vote = await votes.getById(id, user_id);
        if (vote.length) {
            let can = true;
            for (const v of vote) {
                if (v.suggestion_id === id && v.user_id === user_id) {
                    can = false
                    break;
                }
            }
            
            if (can) {
                console.log('here')
                await db
                    .update({ yes })
                    .from(this.table)
                    .where({ id })
                return true;
            }
        } else {
            console.log('hereeeeeeeeee')

            await votes.add({user_id, suggestion_id: id});
            await db
                    .update({ yes })
                    .from(this.table)
                    .where({ id })
            return true;
        }
        
    }

    async updateSuggestionNo(id, no, user_id) {
        const vote = await votes.getById(id, user_id);
        if (vote.length) {
            let can = true;
            for (const v of vote) {
                if (v.suggestion_id === id && v.user_id === user_id) {
                    can = false
                    break;
                }
            }
            
            if (can) {
                await db
                    .update({ no })
                    .from(this.table)
                    .where({ id })
                return true;
            }
        } else {
            await votes.add({user_id, suggestion_id: id});
            await db
                    .update({ no })
                    .from(this.table)
                    .where({ id })
            return true;
        }
        
    }

    async getSuggestionById(id) {
		return await db
			.select('id', 'description', 'user_id', 'problem_id', 'yes', 'no')
			.from(this.table)
			.where({ id });
	}

    async getSuggestions(problem_id) {
		return await db
			.select('id', 'description', 'user_id', 'problem_id', 'yes', 'no')
            .from(this.table)
			.where({ problem_id });
            
	}
}

module.exports = Suggestions;
