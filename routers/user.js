const express = require('express')
const router = express.Router()
const db = require('../database')
const confirmToken = require('../middlewares/confirmToken')
const rand = require('csprng')
const sha1 = require('sha1')

// 修改账户
router.post('/api/user', confirmToken, (req, res) => {
    const salt = rand(160, 36);
    const user = {
        salt: salt,
        name: req.body.username,
        password: sha1(req.body.password + salt)
    }

    db.User.update({_id: req.body.id}, user, (err, doc) => {
        // console.log("enter update", err, doc);
        if (err) {
            console.log(err)
        } else {
            res.status(200).end('update successfully')
        }
    })
})

module.exports = router;
