const Member = require('../models/Member')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const MemberController = {
    getMemberById: async (req, res) => {
         try {
            const memberId = req.body;
            const memberFound = await Member.findById(memberId);
            if (!memberFound) {
                return res.status(404).json({ errorCode: "03", msg: 'Account not found'})
            }
            return res.json({
                msg: "Success!",
                member: {
                    _id: memberFound._id,
                    username: memberFound.username,
                    avatar: memberFound.avatar,
                    coverImage: memberFound.coverImage,
                    status: memberFound.status,
                    role: memberFound.role,
                    createdAt: memberFound.createdAt,
                    friends: memberFound.friends,
                    groups: memberFound.groups
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    getProfile: async (req, res) => {
        try {
            const memberId = req.decodedId;
            const memberFound = await Member.findById(memberId);
            if (!memberFound) {
                return res.status(404).json({ errorCode: "03", msg: 'Account not found'})
            }
            return res.json({
                msg: "Success!",
                member: {
                    _id: memberFound._id,
                    username: memberFound.username,
                    avatar: memberFound.avatar,
                    coverImage: memberFound.coverImage,
                    status: memberFound.status,
                    role: memberFound.role,
                    createdAt: memberFound.createdAt,
                    friends: memberFound.friends,
                    groups: memberFound.groups
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    getByName: async (req, res) => {
        try {
            const {memberName} = req.body;
            
            const result = await Member.findOne({ username: memberName });

            if (!result) {
                return res.status(404).json({ errorCode: "03", msg: 'Member not found'})
            } 

            return res.json({
                msg: "Success!",
                member: {
                    _id: result._id,
                    username: result.username,
                    avatar: result.avatar,
                    coverImage: result.coverImage,
                    status: result.status,
                    friends: result.friends,
                    groups: result.groups
                }
            })

        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    changePassword: async (req, res) => {
        try {
            const { memberId } = req.params;
            const { oldPassword, newPassword } = req.body

            const memberFound = await Member.findById(memberId)

            if (!memberFound) {
                return res.status(404).json({errorCode: "03", msg: 'Account not found'})
            }

            if(!oldPassword) return res.status(404).json({errorCode: "04", msg: "Old password is require."})
            if(!newPassword) return res.status(404).json({errorCode: "05", msg: "New password is require."})
            const comparePassword = await bcrypt.compare(oldPassword, memberFound.password);
            if (!comparePassword) return res.status(403).json({errorCode: "06", msg: "Password not compare"})

            const password = await bcrypt.hash(newPassword, 10);

            const updatePassword = await Member.updateOne(
                {"_id": memberId},
                {$set: {password: password}},
                {upsert: true}
            )

            return res.json({
                msg: "Success!",
                member: {
                    _id: memberFound._id,
                    username: memberFound.username,
                    avatar: memberFound.avatar,
                    coverImage: memberFound.coverImage,
                    status: memberFound.status,
                    role: memberFound.role,
                    createdAt: memberFound.createdAt
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    updateProfile: async (req, res) => {
        try {
            const { accountId } = req.params;
            const { accountNameUpdate } = req.body

            const memberFound = await Member.findById(accountId)

            console.log(accountId)

            if (!memberFound) {
                return res.status(404).json({errorCode: "03", msg: 'Member not found'})
            }

            if(!accountNameUpdate) return res.status(403).json({errorCode: "02", msg: "Username is require."})

            const updateMember = await Member.updateOne(
                {"_id": accountId},
                {$set: {username: accountNameUpdate}},
                {upsert: true}
            )

            const result = await Member.findById(accountId)

            return res.json({
                msg: "Success!",
                member: {
                    _id: result._id,
                    username: result.username,
                    avatar: result.avatar,
                    coverImage: result.coverImage,
                    status: result.status,
                    role: result.role,
                    createdAt: result.createdAt
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    deactiveAcount: async (req, res) => {
        try { 
            const { memberId } = req.params;
            const memberFound = await Member.findById(memberId)
            if (memberFound.status === "ACTIVE") {
                const updateMember = await Member.updateOne(
                    {"_id": memberId},
                    {$set: {status: "INACTIVE"}},
                    {upsert: true}
                )
            } else {
                return res.status(403).json({errorCode: "17", msg: "This account is already deactive"})
            }

            const result = await Member.findById(memberId)

            return res.json({
                msg: "Success!",
                member: {
                    _id: result._id,
                    username: result.username,
                    avatar: result.avatar,
                    coverImage: result.coverImage,
                    status: result.status,
                    role: result.role,
                    createdAt: result.createdAt
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    activeAccount: async (req, res) => {
        try { 
            const { memberId } = req.params;
            const memberFound = await Member.findById(memberId)
        
            if (memberFound.status === "INACTIVE") {
                const updateMember = await Member.updateOne(
                    {"_id": memberId},
                    {$set: {status: "ACTIVE"}},
                    {upsert: true}
                )
            } else {
                return res.status(403).json({errorCode: "18", msg: "This account is already active"})
            }

            const result = await Member.findById(memberId)

            return res.json({
                msg: "Success!",
                member: {
                    _id: result._id,
                    username: result.username,
                    avatar: result.avatar,
                    coverImage: result.coverImage,
                    status: result.status,
                    role: result.role,
                    createdAt: result.createdAt
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    getListMembers: async (req, res) => {
        try {
            const members = await Member.find()
            if (members.length === 0) {
              return res.status(400).json({ errorCode: "21", message: "List members are empty" });
            };
            return res.json({
                msg: "Success!", 
                data: members 
            });
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    acceptAddFriend: async (req, res) => {
        try {
            const memberId1 = req.decodedId;
            const { memberId } = req.params;

            const member1 = await Member.findById(memberId1);
            const memberFriend = member1.friends.filter((data) => {
                if (String(data.friendId) === String(memberId)) {
                    return data.friendId
                }
            });

            const member2 = await Member.findById(memberId);
            const memberFriend1 = member2.friends.filter((data) => {
                if (String(data.friendId) === String(memberId1)) {
                    return data.friendId
                }
            });

            if (memberFriend.length > 0 || memberFriend1.length > 0) {
                return res.status(404).json({ errorCode: "33", msg: 'Member already in friend list' });
            } else {
                const updateMember = await Member.findByIdAndUpdate(
                    memberId,
                    {
                        $push: {
                            friends: {
                                friendId: mongoose.Types.ObjectId(memberId1),
                                createdAt: new Date(),
                            }
                        }
                    },
                    { new: true, useFindAndModify: false }
                );
    
                const updateMember1 = await Member.findByIdAndUpdate(
                    memberId1,
                    {
                        $push: {
                            friends: {
                                friendId: mongoose.Types.ObjectId(memberId),
                                createdAt: new Date(),
                            }
                        }
                    },
                    { new: true, useFindAndModify: false }
                );
            }

            const result = await Member.findById(memberId1);

            return res.json({
                msg: "Success!", 
                data: {
                    result,
                } 
            });

        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    getMemberFriend: async (req, res) => {
        try {
            const memberId = req.decodedId;
            const member = await Member.findById(memberId);

            if (!member) {
                return res.status(403).json({errorCode: "03", msg: "Member not found"})
            }

            const data = member.friends

            return res.json({
                msg: "Success!",
                data: {
                    data
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    getMemberGroup: async (req, res) => {
        try {
            const memberId = req.decodedId;
            const member = await Member.findById(memberId);

            if (!member) {
                return res.status(403).json({errorCode: "03", msg: "Member not found"})
            }

            const data = member.groups

            return res.json({
                msg: "Success!",
                data: {
                    data
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    }
}

module.exports = MemberController