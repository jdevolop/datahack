'use strict';

// get 
// G2 - Регионы, G4 - Количество учеников, G5 - Уровень охвата,  %
// title
// 
const { getInfo } = require("../../../../../services/openData");

function parse(data) {
    let result = []
    for (const region of data) {
        result.push({
            region_title: region['G2'],
            pupil_count: region['G4'],
            percent_level: region['G5']
        })
    }
    return result;
} 
 
async function getStudying() {
    const { status: status_code, data: _version } = await getInfo('/dataset/9197');
    if (status_code !== 200) {
        console.error(status);
        return null;
    }
    const structure_id = _version.structure.id;

    const { status, data } = await getInfo('/dataset/9197/version/' + structure_id);
    if (status !== 200) {
        console.error(status);
        return null;
    }

    return parse(data);
}

// ;(async () => {
//     console.log(await getStudying());
// })();

module.exports = getStudying;