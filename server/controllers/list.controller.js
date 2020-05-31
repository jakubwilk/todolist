const Router = require('express');
const { getUserLists } = require('../services/list.service');

module.exports = {
    list() {
        const api = Router();

        api.get('/lists/:id', getUserLists);

        return api;
    }
}