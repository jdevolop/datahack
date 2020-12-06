'use strict';

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

const DATA_URL = 'http://data.gov.uz/ru/api/v1/json';
const DATA_KEY = 'aa36998bcc988ef8cc4ddc2558197554';
// https://api.stat.uz/api/v1.0/data/11-sinf-bitiruvchilari-hududlar-kesimida-jinsi-boy?lang=ru&format=csv
const IS_DEV = ENV === 'development';
const IS_PROD = ENV === 'production';

const JWT_SECRET = process.env.JWT_SECRET || 'verydificultth98rt8asr4569g8h43tq42G@#G*$T*hnnj89hH$T@#H(G)H(GV+#+G$$secret';
const BOT_TOKEN = '977865985:AAFfDURpsyy1LaCwLTlp_iDaZjHRiQMxCZk';

module.exports = {
    PORT,
    IS_DEV,
    JWT_SECRET,
    DATA_URL,
    DATA_KEY,
    IS_PROD,
    BOT_TOKEN,
    ENV,
};