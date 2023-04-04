const FeedBack = require('../models/FeedBack');
const FeedBackType = require('../models/FeedBackType');
const Member = require('../models/Member');
const mongoose = require('mongoose');

const FeedBackController = {
    addType: async (req, res) => {
        try {
            const updateBy = req.decodeId;
            const { title } = req.body;

            const findFbType = await FeedBackType.findOne({title})
            if (findFbType) {
                return res.status(403).json({errorCode: "32", msg: 'Feedback type already exists 32'})
            }

            const newFbType = new FeedBackType({title, updatedBy: updateBy});

            await newFbType.save();

            res.json({
                msg: "Create feedback type success!",
                result: {
                    ...newFbType._doc,
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    editType: async (req, res) => {
        try {

        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    createFb: async (req, res) => {
        try {

        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    getListFb: async (req, res) => {
        try {

        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    selectById: async (req, res) => {
        try {

        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    deleteById: async (req, res) => {
        try {

        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },
}
