const Posts = require('../models/Posts');
const Group = require('../models/Group');

const PostsController = {
    createPosts: async (req, res) => {
        try {
            const updateBy = req.decodedId;
            const { title, description } = req.body;

            const newPosts = new Posts({title, description, updatedBy: updateBy});

            await newPosts.save();

            res.json({
                msg: "Create posts Success!",
                posts: {
                    ...newPosts._doc,
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    createPostsInGroup: async (req, res) => {
        try {
            const { groupId } = req.params;
            const updateBy = req.decodedId;
            const { title, description } = req.body;

            const groupFound = await Group.findById(groupId)

            if (!groupFound) return res.status(403).json({errorCode: "22", msg: 'Group not found'})

            const newPosts = new Posts({title, description, updatedBy: updateBy, inGroup: groupId});

            await newPosts.save();

            res.json({
                msg: "Create posts Success!",
                posts: {
                    ...newPosts._doc,
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },
}

module.exports = PostsController