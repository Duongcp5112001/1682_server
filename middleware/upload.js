const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'upload/')
    },
    filename: function (req, file, callback) {
        let ext = path.extname(file.originalname)
        callback(null, Date.now() + ext)
    }
})

const upload = multer ({
    storage: storage,
    fileFilter: function(req, flie, callback) {
        if(file.mimetype == 'image/png' || file.mimetype == "image/jpeg"){
            callback(null, true)
        } else {
            console.log("Only jpg and png file supported")
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload