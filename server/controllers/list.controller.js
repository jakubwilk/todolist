const Router = require('express');
const { getUserLists, createUserList } = require('../services/list.service');

module.exports = {
    list() {
        const api = Router();

        api.get('/lists/:id', getUserLists);
        api.post('/create', createUserList);

        return api;
    }
}