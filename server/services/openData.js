const axios = require('axios');
const {
    DATA_KEY, DATA_URL
} = require("../config")

module.exports = {
    async getInfo(endpoint) {
        const res = await axios.get(DATA_URL + endpoint + '?access_key=' + DATA_KEY);

        return {
            data: res.data,
            status: res.status,
        }
    }
}
