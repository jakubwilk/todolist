const List = require('../models/list.model');

module.exports = {
    async getUserLists(req, res) {
        const uid = req.params;

        const lists = await List.find({ uid: uid });

        if (!lists) {
            return res.send({ status: 200, type: 'error', message: ['You do not have any lists yet. Create the first one'] });
        }

        return res.send({ status: 200, type: 'success', message: lists });
    }
}