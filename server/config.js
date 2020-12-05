'use strict';

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

const DATA_URL = 'http://data.gov.uz/ru/api/v1/json';
const DATA_KEY = 'aa36998bcc988ef8cc4ddc2558197554';

const IS_DEV = ENV === 'development';
const IS_PROD = ENV === 'production';

module.exports = {
    PORT,
    IS_DEV,
    DATA_URL,
    DATA_KEY,
    IS_PROD,
    ENV,
};