const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const db = require('../database')
const sha1 = require('sha1')

// 创建token
const createToken = (id, name) => {
    return jwt.sign(
        {
            id: id,
            name: name
        },
        process.env.CERT,
        {
            expiresIn: '7d'
        }
    )
}

router.post('/api/login', (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    if(password == ''|| username==''){
        res.json({
            code: 2,
            message: '用户名或密码不能为空'
        });
        return
    }

    db.User.findOne({ username: username }, (err, doc) => {

        if(err){
            console.log(err);
        }

        if (doc) {
            const salt = doc.salt;
            // console.log(salt, doc.password, req.body.password, sha1(req.body.password + salt));
            if(doc.password === sha1(req.body.password + salt)) {
                const token = createToken(doc._id, doc.username);
                res.status(200).send({
                    id: doc._id,
                    username: doc.username,
                    token: token
                })
            } else {
                res.status(401).end(JSON.stringify({message: 'login failed'}));
            }
            return;
        } 

        res.status(401).end(JSON.stringify({code: 2, message: '用户名或密码不存在'}));
    })
})

module.exports = router;
