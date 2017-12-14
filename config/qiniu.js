/**
 * 上传七牛云配置
 */
const path = require('path');

const qiniu = {
    root: path.resolve(__dirname, '../'),   // 根目录
    qiniu_config: {
        accessKey: process.env.QN_ACCESSKEY,
        secretKey: process.env.QN_SECRETKEY,
        bucket: 'skcy',
        origin: 'https://olmcfg2fj.qnssl.com'
    }
}

module.exports = qiniu;
