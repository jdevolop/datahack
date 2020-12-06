'use strict';

const Spheres = require("../spheres/models/Spheres");
const Districts = require("../regions/models/Districs");
const Cities = require("../regions/models/Cities");
const Regions = require("../regions/models/Regions");
const Organizations = require("../organizations/models/Organization");
const Users = require("../users/models/Users");
const OrganizationAdmins = require("../organizations/models/OrganizationAdmins.js")
const Problems = require("../problems/models/Problems");
const Suggestions = require("../problems/models/Suggestions");
const Votes = require("../problems/models/Votes");

;(async () => {
    await Users.createTable();

    await Spheres.createTable();
    await Organizations.createTable();
    await Regions.createTable();
    await Cities.createTable();
    await Districts.createTable();

    await OrganizationAdmins.createTable();
    await Problems.createTable();
    await Suggestions.createTable();
    await Votes.createTable();


})();

