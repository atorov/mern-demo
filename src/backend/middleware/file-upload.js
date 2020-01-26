const multer = require('multer')
const shortid = require('shortid')

const MIME_TYPE_MAP = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
}

const fileUpload = multer({
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype]
        const error = isValid ? null : new Error('Invalid mime type!')
        cb(error, isValid)
    },
    limit: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/img/')
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype]
            cb(null, `${shortid.generate()}.${ext}`)
        },
    }),
})

module.exports = fileUpload
