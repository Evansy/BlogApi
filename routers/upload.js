/**
 * 图片上传路由
 * 参考 http://www.jianshu.com/p/698e661fa622
 */

const express = require('express');
const router = express.Router();

const qn = require('qn');
const upload = require('../config/upload');
const config = require('../config/qiniu').qiniu_config;
const confirmToken = require('../middlewares/confirmToken')

router.post('/uploadImage', confirmToken, (req, res, rext) => {
    // 七牛相关配置信息
    let client = qn.create(config);

    // 上传单个文件
    // 这里`avatar`对应前端form input中的name
    upload.single('avatar')(req, res, err => {

        if(err){
            return console.error(err);
        }

        if(req.file && req.file.buffer) {
            //获取源文件后缀名
            var fileFormat = (req.file.originalname).split("."); 
            //设置上传到七牛云的文件命名
            var filePath = '/upload/article/' + req.file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1];

            client.upload(req.file.buffer, {
                key: filePath
            }, (error, result) => {
                if(error){
                    return res.json({
                        code: 0,
                        message: '上传失败',
                        data: {
                            src: ''
                        }
                    })
                }
                res.json({
                    code: 1,
                    message: '上传成功',
                    data: {
                        src: result.url
                    }
                })
            })
        }
    })
})

module.exports = router;
