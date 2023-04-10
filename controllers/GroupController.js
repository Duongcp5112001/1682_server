const Group = require('../models/Group');
const Member = require('../models/Member');
const mongoose = require('mongoose');

const GroupController = {
    createGroup: async (req, res) => {
        try {
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
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
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

    getByName: async (req, res) => {
        try {
            const {groupName} = req.body;
            
            const result = await Group.findOne({ name: groupName });

            if (!result) {
                return res.status(404).json({ errorCode: "22", msg: 'Group not found'})
            } 

            return res.json({
                msg: "Success!",
                member: {
                    _id: result._id,
                    name: result.name,
                    description: result.description,
                    avatar: result.avatar,
                    coverImage: result.coverImage,
                    status: result.status,
                }
            })

        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    editGroup: async (req, res) => {
        try {
            const memberId = req.decodedId;
            const { name, description, avatar, coverImage } = req.body;
            const { groupId } = req.params;

            const groupFound = await Group.findById(groupId);

            if (String(groupFound.updatedBy) === String(memberId)) {
                const updateData = await Group.findOneAndUpdate(
                    groupId,
                    {
                      $set: {
                        name: name,
                        description: description,
                        avatar: avatar,
                        coverImage: coverImage
                      },
                    },
                    { new: true, useFindAndModify: false }
                );
            } else {
                return res.status(404).json({ errorCode: "29", msg: 'You do not have permission to edit the group'})
            };

            const result = await Group.findById(groupId);

            res.json({
                msg: "Success!",
                posts: {
                    ...result._doc,
                }
            });
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    acceptMemberJoin: async (req, res) => {
        try {
            const ownerId = req.decodedId;
            const { memberId, groupId } = req.params;
            
            const groupFound = await Group.findById(groupId);
            const memberFound = await Member.findById(memberId);

            if (!groupFound) {
                return res.status(404).json({ errorCode: "21", msg: 'Group not found' });
            }
            if (!memberFound) {
                return res.status(404).json({ errorCode: "03", msg: 'Member not found' });
            }

            const memberInGroup = groupFound.members.filter((data) => {
                if (String(data.memberGroup) === String(memberId)) {
                    return data.memberGroup
                }
            });

            const updateMember = await Member.findByIdAndUpdate(
                memberId,
                {
                    $push:{
                        groups: {
                            groupId: mongoose.Types.ObjectId(groupId),
                            createdAt: new Date(),
                        }
                    }
                },
                { new: true, useFindAndModify: false }
            )

            if (memberInGroup.length > 0) {
                return res.status(404).json({ errorCode: "31", msg: 'Member already in group' });
            } else {
                if (ownerId === String(groupFound.updatedBy)) {
                    const updateData = await Group.findByIdAndUpdate(
                        groupId,
                        {
                            $push: {
                                members: {
                                    memberGroup: mongoose.Types.ObjectId(memberId),
                                    createdAt: new Date(),
                                },
                            },
                        },
                        { new: true, useFindAndModify: false }
                    );
                } else {
                    return res.status(404).json({ errorCode: "30", msg: 'You do not have permission to accept member join the group'})
                };
            }

            const result = await Group.findById(groupId);

            res.json({
                msg: "Success!",
                posts: {
                    ...result._doc,
                }
            });
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    }
}

module.exports = GroupController