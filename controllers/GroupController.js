const Group = require('../models/Group');

const GroupController = {
    createGroup: async (req, res) => {
        const updateBy = req.decodedId;
        const { name, description } = req.body;

        const group = await Group.findOne({name});

        if(group) {
            return res.status(16).json({msg: 'Group already exists'})
        }

        const newGroup = new Group({name, description, updatedBy: updateBy});

        await newGroup.save();

        res.json({
            msg: "Create group Success!",
            member: {
                ...newGroup._doc,
            }
        })
    }
}

module.exports = GroupController