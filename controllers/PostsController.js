const Posts = require('../models/Posts');
const Group = require('../models/Group');
const mongoose = require('mongoose');
const Member = require('../models/Member');


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

    deletePosts: async (req, res) => {
        try {
            const updateBy = req.decodedId;
            const { postsId } = req.params;

            const postsFound = await Posts.findById(postsId);

            if (!postsFound) {
                return res.status(404).json({ errorCode: "23", msg: 'Posts not found'})
            }

            if (updateBy === String(postsFound.updatedBy)) {
                const updateData = await Posts.findByIdAndDelete(postsId);
            } else {
                return res.status(404).json({ errorCode: "25", msg: 'You do not hae permission to delete the posts'})
            };

            res.json({
                msg: "Delete posts Success!",
            });
            
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

    deleteGroupPosts: async (req, res) => {
        try {
            const updateBy = req.decodedId;
            const { postsId, groupId } = req.params;

            const postsFound = await Posts.findById(postsId);
            const groupFound = await Group.findById(groupId);

            if (!postsFound) {
                return res.status(404).json({ errorCode: "23", msg: 'Posts not found'})
            }

            if (!groupFound) {
                return res.status(404).json({ errorCode: "22", msg: 'Group not found'})
            }

            if (updateBy === String(postsFound.updatedBy) && groupId === postsFound.inGroup) {
                const updateData = await Posts.findByIdAndDelete(postsId);
            } else {
                return res.status(404).json({ errorCode: "26", msg: 'You do not hae permission to delete the posts'})
            };

            res.json({
                msg: "Delete posts Success!",
            });
            
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

            if (!postsFound) {
                return res.status(404).json({ errorCode: "23", msg: 'Posts not found'})
            }
            
            const { like, dislike } = postsFound;

            let update = {};

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

    viewPosts: async (req, res) => {
        try {
            const { postsId } = req.params;
            const updateBy = req.decodedId;

            const postsFound = await Posts.findById(postsId);
            
            if (!postsFound) {
                return res.status(404).json({ errorCode: "23", msg: 'Posts not found'})
            }

            const updateData = await Posts.findByIdAndUpdate(
                postsId,
                {
                    $push: {
                        views: {
                            user: mongoose.Types.ObjectId(updateBy),
                            createdAt: new Date(),
                        }
                    }
                },
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

    commentPosts: async (req, res) => {
        try {
            const { postsId } = req.params;
            const { content } = req.body;
            const updateBy = req.decodedId;

            const postsFound = await Posts.findById(postsId);

            if (!postsFound) {
                return res.status(404).json({ errorCode: "23", msg: 'Posts not found'})
            }

            const updateData = await Posts.findByIdAndUpdate(
                postsId,
                {
                    $push: {
                        comments: {
                            content,
                            createdAt: new Date(),
                            createdBy: mongoose.Types.ObjectId(updateBy),
                            editHistory: [],
                        },
                        $position: 0,
                    },
                },
            );

            const result = await Posts.findById(String(updateData._id));

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

    deleteCommentPosts: async (req, res) => {
        try {
            const { postsId, commentId } = req.params;
            const memberId = req.decodedId;

            const postsFound = await Posts.findById(postsId);
            
            const commentFound = postsFound.comments.filter((cmt) => {
                if (String(cmt._id) === commentId) {
                    const cmtId = cmt._id;
                    return cmtId;
                }
            });

            const dataMember = commentFound.map(data => data.createdBy)

            const memberFound = await Member.findById(memberId);

            if (!postsFound) {
                return res.status(404).json({ errorCode: "23", msg: 'Posts not found'})
            }
            if (!commentFound) {
                return res.status(404).json({ errorCode: "24", msg: 'Posts comment not found'})
            }
            if (!memberFound) {
                return res.status(404).json({ errorCode: "03", msg: 'Member not found'})
            }

            if (memberId === String(dataMember)) {
                const updateData = await Posts.findByIdAndUpdate(
                    postsId,
                    {
                      $pull: {
                        comments: {
                          _id: mongoose.Types.ObjectId(commentId),
                        },
                      },
                    },
                    { new: true, useFindAndModify: false }
                );
            } else {
                return res.status(404).json({ errorCode: "24", msg: 'You do not hae permission to delete the comment'})
            };

            const result = await Posts.findById(postsId);

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
}

module.exports = PostsController