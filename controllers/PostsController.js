const Posts = require('../models/Posts');
const Group = require('../models/Group');
const mongoose = require('mongoose')

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

    likeDislikePosts: async (req, res) => {
        try {
            const { postsId, action } = req.params;
            const updateBy = req.decodedId;

            const postsFound = await Posts.findById(postsId);

            const { like, dislike } = postsFound;

            let update = {};

            if (!postsFound) return res.status(403).json({errorCode: "23", msg: 'Posts not found'})

            if (action === 'like') {
                console.log("like")
                if (like.map((data) => String(data.user)).includes(updateBy)) {
                    console.log("like if")
                    update = {
                        $pull: {
                            like: {
                                user: mongoose.Types.ObjectId(updateBy),
                            },
                        },
                    };
                } else {
                    console.log("like else")
                    update = {
                        $push: {
                          like: {
                            user: mongoose.Types.ObjectId(updateBy),
                            createdAt: new Date(),
                          },
                        },
              
                        $pull: {
                          dislike: {
                            user: mongoose.Types.ObjectId(updateBy),
                          },
                        },
                    };
                };
            } else {
                if (dislike.map((data) => String(data.user)).includes(updateBy)) {
                    update = {
                        $pull: {
                            like: {
                                user: mongoose.Types.ObjectId(updateBy),
                            }
                        }
                    };
                } else {
                    update = {
                        $push: {
                          dislike: {
                            user: mongoose.Types.ObjectId(updateBy),
                            createdAt: new Date(),
                          },
                        },
              
                        $pull: {
                          like: {
                            user: mongoose.Types.ObjectId(updateBy),
                          },
                        },
                    };
                };
            };

            const updateData = await Posts.findByIdAndUpdate(
                postsId,
                update,
                { new: true, useFindAndModify: false }
            );

            const result = await Posts.findById(String(updateData._id));

            const likeCount = result.like.length;
            const dislikeCount = result.dislike.length;
            const commentsCount = result.comments.length;
            const viewCount = result.views.length;
            const comment = result.comments.filter((cmt) => {
                const createdBy = cmt.createdBy;
                return createdBy;
            });

            res.json({
                msg: "Success!",
                posts: {
                    ...result._doc,
                    likeCount,
                    dislikeCount,
                    commentsCount,
                    viewCount,
                    comment,
                }
            });
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },
}

module.exports = PostsController