'use strict';

var $ = require('jquery');
var Response = require('./responses/Response');

function parse (response) {
    return new Response(response).getItemAsList();
}

var ConfigApi = {

    getTypes: function () {
        return $.getJSON(API_URL + '/api/type').pipe(parse);
    },

    getCategories: function () {
        return $.getJSON(API_URL + '/api/category').pipe(parse);
    },

    getIntents: function () {
        return $.getJSON(API_URL + '/api/intent').pipe(parse);
    },

    getContactTypes: function () {
        return $.getJSON(API_URL + '/api/contactType').pipe(parse);
    },

    getOrganizations: function () {
        return $.getJSON(API_URL + '/api/agency').pipe(parse);
    },

    getUsers: function () {
        return $.getJSON(API_URL + '/api/profile').pipe(parse);
    }

};

module.exports = ConfigApi;
