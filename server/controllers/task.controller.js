const Router = require('express');
const { getUserTasks } = require('./../services/task.service');

module.exports = {
    task() {
        const api = Router();

        api.get('/list/:listId/user/:userId', getUserTasks);

        return api;
    }
}