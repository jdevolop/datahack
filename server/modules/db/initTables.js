'use strict';

const Spheres = require("../spheres/models/Spheres");
const Districts = require("../regions/models/Districs");
const Cities = require("../regions/models/Cities");
const Regions = require("../regions/models/Regions");
const Organizations = require("../organizations/models/Organization");
const Users = require("../users/models/Users");

;(async () => {
    await Users.createTable();

    await Spheres.createTable();
    await Organizations.createTable();
    await Regions.createTable();
    await Cities.createTable();
    await Districts.createTable();

})();

