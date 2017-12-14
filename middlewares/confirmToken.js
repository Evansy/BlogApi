const jwt = require('jsonwebtoken');

// 检查token是否有效
const confirmToken = (req, res, next) => {
    if(!req.headers.authorization){
        res.status(401).end(JSON.stringify({message: "no token"}));
    } else {
        const authorization = req.headers.authorization;
        const token = authorization && authorization.split(' ')[1];
        
        jwt.verify(token, process.env.CERT, error => {
            error && res.status(401).end(error.message);
        })
    }
    next();
}

module.exports = confirmToken;
