const Task = require('./../models/task.model');
const User = require('./../models/user.model');
const List = require('./../models/list.model');

module.exports = {
    async getUserTasks(req, res) {
        const { userId, listId } = req.params;

        const user = await User.findById({ _id: userId });

        if (!user) {
            return res.send({ status: 200, type: 'error', message: ['User not found'] });
        }

        const list = await List.findById({ _id: listId });

        if (!list) {
            return res.send({ status: 200, type: 'error', message: ['List not found'] }); 
        }

        const tasks = await Task.find({ lid: listId });

        if (tasks.length === 0) {
            return res.send({ status: 200, type: 'error', message: ['This list has no tasks. Adds them to the list'], list: list });
        }

        const data = {
            tasks: tasks,
            list: list
        }

        return res.send({ status: 200, type: 'success', message: data });
    }
};