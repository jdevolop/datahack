'use strict';

const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const Stage = require('telegraf/stage')
const session = require('telegraf/session');

const { BOT_TOKEN } = require("../config");
const Problems = require("../modules/problems/models/Problems");
const Users = require('../modules/users/models/Users');
const { use } = require('../app');

const bot = new Telegraf(BOT_TOKEN);
const problems = new Problems();
const users = new Users();

bot.use(session());

bot.start(async (ctx) => { 
    // await ctx.reply(`Здраствуйте ${ctx.message.from.first_name}. Выберите сферу ⬇`, Markup
    //             .keyboard(
    //               ['Образование'], 
    //             )
    //             .oneTime()
    //             .resize()
    //             .extra()
    // )
    await ctx.reply(`Здраствуйте ${ctx.message.from.first_name}`);

});

let list = ['mno', 'minenergy'];

function parseByOrganizations(str, ctx) {
    for (const name of list) {
        if (name === 'mno') {
            if (str.includes('#'+name) && str.includes('@fromstudio_bot')) {
                const filtered = str.split('#mno').join('').split('@fromstudio_bot').join('');
                users.getUserById(ctx.message.from.id)
                    .then(user => {
                        if (user.length) {
                            problems.add({ description: filtered,  user_id: user[0].id, sphere_id: 3})
                                .then(res => {
                                    if (res.length) {
                                        ctx.reply(ctx.message.from.first_name + ", ваше обращение рассмотрят в Министерстве Народного Образования");
                                    } else {
                                        ctx.reply('Извините' + ctx.message.from.first_name + ", Попробуйте еще раз. Произошла неизвестная ошибка");
                                    }
                                });
                        } else {
                            const user_data = {
                                tg_id: ctx.message.from.id,
                                first_name: ctx.message.from.first_name || "",
                                last_name: ctx.message.from.last_name || "",
                                username: ctx.message.from.username || "",
                                photo_url: ""
                            }
                            users.add(user_data)
                                .then(user => {
                                    if (user.length) {
                                        problems.add({ description: filtered,  user_id: user[0].id, sphere_id: 3})
                                        .then(res => {
                                            if (res.length) {
                                                ctx.reply(ctx.message.from.first_name + ", ваше обращение рассмотрят в Министерстве Народного Образования");
                                            } else {
                                                ctx.reply('Извините' + ctx.message.from.first_name + ", Попробуйте еще раз. Произошла неизвестная ошибка");
                                            }
                                        });
                                    }
                                })
                        }
                    });
            }
        } else if (name === 'minenergy') {
            if (str.includes('#'+name) && str.includes('@fromstudio_bot')) {
                const filtered = str.split('#minenergy').join('').split('@fromstudio_bot').join('');
                users.getUserById(ctx.message.from.id)
                    .then(user => {
                        if (user.length) {
                            problems.add({ description: filtered,  user_id: user[0].id, sphere_id: 4})
                                .then(res => {
                                    if (res.length) {
                                        ctx.reply(ctx.message.from.first_name + ", ваше обращение рассмотрят в Министерстве Энергетики");
                                    } else {
                                        ctx.reply('Извините' + ctx.message.from.first_name + ", Попробуйте еще раз. Произошла неизвестная ошибка");
                                    }
                                });
                        } else {
                            const user_data = {
                                tg_id: ctx.message.from.id,
                                first_name: ctx.message.from.first_name || "",
                                last_name: ctx.message.from.last_name || "",
                                username: ctx.message.from.username || "",
                                photo_url: ""
                            }
                            users.add(user_data)
                                .then(user => {
                                    if (user.length) {
                                        problems.add({ description: filtered,  user_id: user[0].id, sphere_id: 3})
                                        .then(res => {
                                            if (res.length) {
                                                ctx.reply(ctx.message.from.first_name + ", ваше обращение рассмотрят в Министерстве Энергетики");
                                            } else {
                                                ctx.reply('Извините' + ctx.message.from.first_name + ", Попробуйте еще раз. Произошла неизвестная ошибка");
                                            }
                                        });
                                    }
                                })
                        }
                    });

            }
        }
        
    }
};

bot.command('help', (ctx) => {
    ctx.reply(`
Список Доступных Организаций:
    #mno - Министерство Народного Образования
    #minenergo - Министерстве Энергетики

Пример использования:
    Мое обращение по поводу ...
    
    @fromstudio_bot
    #mno
    `)
});

bot.on('message', (ctx) => {
    parseByOrganizations(ctx.message.text, ctx);
}); 



module.exports = bot;
// bot.hears(, async (ctx) => {
    
    
// });