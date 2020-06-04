const Router = require('express');
const { getUserTasks, addNewTask, deleteTask, updateTask } = require('./../services/task.service');

module.exports = {
    task() {
        const api = Router();

        api.get('/list/:listId/user/:userId', getUserTasks);
        api.post('/create', addNewTask);
        api.get('/delete/:taskId', deleteTask);
        api.get('/update/:taskId/:value', updateTask);

        return api;
    }
}