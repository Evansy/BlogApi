/**
 * upload处理multer 
 */
const bytes = require('bytes');
const multer = require('multer');

// 配置multer 详细参考https://github.com/expressjs/multer
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: bytes('4MB'), // 限制文件4M内
    },
    fileFilter(req, files, callback) {
        // 只允许上传JPG|PNG|JPEG|GIF格式图片
        let type = `|${files.mimetype.slice(files.mimetype.lastIndexOf('/') + 1)}|`;
        var fileTypeValid = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;
        callback(null, !!fileTypeValid);
    }
});

module.exports = upload;
