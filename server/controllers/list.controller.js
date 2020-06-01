const Router = require('express');
const { getUserLists, createUserList, editUserList } = require('../services/list.service');

module.exports = {
    list() {
        const api = Router();

        api.get('/lists/:id', getUserLists);
        api.post('/create', createUserList);
        api.get('/edit/:id', editUserList);

        return api;
    }
}