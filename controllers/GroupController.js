const Group = require('../models/Group');

const GroupController = {
    createGroup: async (req, res) => {
        const updateBy = req.decodedId;
        const { name, description } = req.body;

        const group = await Group.findOne({name});

        if(group) {
            return res.status(403).json({errorCode: "17", msg: 'Group already exists'})
        }

        const newGroup = new Group({name, description, updatedBy: updateBy});

        await newGroup.save();

        res.json({
            msg: "Create group Success!",
            member: {
                ...newGroup._doc,
            }
        })
    },

    deactiveGroup: async (req, res) => {
        try { 
            const { groupId } = req.params;
            const groupFound = await Group.findById(groupId)
            if (groupFound.status === "ACTIVE") {
                const updateGroup = await Group.updateOne(
                    {"_id": groupId},
                    {$set: {status: "INACTIVE"}},
                    {upsert: true}
                )
            } else {
                return res.status(403).json({errorCode: "19", msg: "This group is already deactive"})
            }

            const result = await Group.findById(groupId)

            return res.json({
                msg: "Success!",
                member: {
                    _id: result._id,
                    name: result.username,
                    description: result.description,
                    avatar: result.avatar,
                    coverImage: result.coverImage,
                    status: result.status,
                    createdAt: result.createdAt
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    activeGroup: async (req, res) => {
        try { 
            const { groupId } = req.params;
            const groupFound = await Group.findById(groupId)
        
            if (groupFound.status === "INACTIVE") {
                const updateGroup = await Group.updateOne(
                    {"_id": groupId},
                    {$set: {status: "ACTIVE"}},
                    {upsert: true}
                )
            } else {
                return res.status(403).json({errorCode: "20", msg: "This group is already active"})
            }

            const result = await Group.findById(groupId)

            return res.json({
                msg: "Success!",
                member: {
                    _id: result._id,
                    name: result.username,
                    description: result.description,
                    avatar: result.avatar,
                    coverImage: result.coverImage,
                    status: result.status,
                    createdAt: result.createdAt
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    getListGroups: async (req, res) => {
        try {
            const groups = await Group.find()
            if (groups.length === 0) {
              return res.status(400).json({ errorCode: "22", message: "List groups are empty" });
            };
            return res.json({
                msg: "Success!", 
                data: groups 
            });
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },
}

module.exports = GroupController