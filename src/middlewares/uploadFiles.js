// import package here
const multer = require("multer")

exports.uploadFiles = (photo) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if (file.fieldname === photo) {
                cb(null, "uploads/image");
            } 
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
        },
    });

    const fileFilter = function (req, file, cb) {
        if (file.fieldname == photo) {
            if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                req.fileValidationError = {
                    message: "Only image files are allowed",
                };
                return cb(new Error("Only image files are allowed", false));
            }
        }

       
        cb(null, true);
    };

    const sizeInMB = 100;
    const maxSize = sizeInMB * 1024 * 1000;

    const upload = multer({
        storage,
        fileFilter,
        limits: {
            fileSize: maxSize,
        },
    }).fields([
        { name: photo, maxCount: 1 }
    ])

    return (req, res, next) => {
        upload(req, res, function (err) {
            if (req.fileValidationError) {
                return res.status(400).send(req.fileValidationError);
            }

            if (!req.file && err) {
                return res.status(400).send({
                    message: "Please select files to upload",
                    err,
                });
            }

            if (err) {
                if (err.code == "LIMIT_FILE_SIZE") {
                    return res.status(400).send({
                        message: "Max file size 10MB",
                    });
                }

                return res.status(400).send(err);
            }

            // if okay
            return next();
        });
    };
};