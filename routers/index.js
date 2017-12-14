const login     = require('./login');
const user      = require('./user');
const article   = require('./article');
const tags      = require('./tags');
const draft     = require('./draft');
const upload    = require('./upload');

module.exports = app => {
    app.use(login);
    app.use(user);
    app.use(article);
    app.use(tags);
    app.use(draft);
    app.use(upload);
}
