'use strict';

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const AppError = require('../helpers/appError');

module.exports = {
	getToken(data, options = {}) {
		try {
			return jwt.sign(data, JWT_SECRET, options);
		} catch (e) {
			throw new AppError({ status: 500, message: 'Server Error' });
		}
	},
	verify(token) {
		try {
			return jwt.verify(token, JWT_SECRET);
		} catch (e) {
			throw new AppError({ status: 500, message: 'Server Error' });
		}
	},
};

