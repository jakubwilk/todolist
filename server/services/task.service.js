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
            return res.send({ status: 200, type: 'error', message: { text: 'This list has no tasks. Adds them to the list', list: list } });
        }

        return res.send({ status: 200, type: 'success', message: { tasks: tasks, list: list } });
    },

    async addNewTask(req, res) {
        const { title, listId } = req.body.data;

        const list = await List.findById({ _id: listId });

        if (!list) {
            return res.send({ status: 200, type: 'error', message: ['List not found'] }); 
        }

        if (title.length > 180) {
            return res.send({ status: 200, type: 'error', message: ['Title is too long'] });
        }

        const task = new Task({ name: title, lid: listId, finished: false });
        task.save()
            .then(task => {
                return res.send({ status: 200, type: 'success', message: ['Task created'] });
            })
            .catch(err => {
                return res.send({ status: 500, type: 'error', message: ['Error while processing your query'] });
            });
    },

    async updateTask(req, res) {
        const { taskId, value } = req.params;

        const task = await Task.findById({ _id: taskId });
        task.finished = value;

        const query = task.save();
        if (!query) {
            return res.send({ status: 500, type: 'error', message: ['There was a problem. Please try it later'] });
        }

        return res.send({ status: 200, type: 'success', message: ['Task updated'] });
    },

    async deleteTask(req, res) {
        const id = req.params.taskId;

        const task = await Task.deleteOne({ _id: id });

        if (!task) {
            return res.send({ status: 500, type: 'error', message: ['Error while processing your query'] });
        }

        return res.send({ status: 200, type: 'success', message: ['Task deleted'] });
    }
};