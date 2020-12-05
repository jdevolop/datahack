'use strict';

const STAT_URL = 'https://api.stat.uz/api/v1.0/data/3-6-yoshli-bolalarni-maktabgacha-talim-bilan-qa?lang=ru&format=json';

const { getData } = require("../../../../services/openData");


function parse(data) {
    let result = {};
    for (const chunk of data.data) {
        result[chunk]
    }
}

async function getGardens() {
    const { status, data, resp } = await getData(STAT_URL);
    if (status !== 200) {
        console.log(status);
        return;
    }

    return data;
}

;(async () => {
    await getGardens();
})();

module.exports = {
    getGardens,
}