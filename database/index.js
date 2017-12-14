const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const sha1 = require('sha1');
const rand = require('csprng');
const Sequence = require('./sequence');

const UserSchema = new Schema(
    {
        username: String,
        password: String,
        salt: String            // 使用csprng来生成随机的盐
    },
    { versionKey: false }
)

const ArticleSchema = new Schema(
    {
        aid: { type: Number, index: { unique: true } },
        title: String,
        content: String,
        image: String,
        tags: [String],
        date: Date,
        isPublish: Boolean,
        comment_n: Number
    },
    { versionKey: false }
)

const CommentSchema = new Schema(
    {
        imgName: String,
        name: String,
        address: String,
        content: String,
        articleId: Number,
        date: Date,
        like: Number
    },
    { versionKey: false }
)

ArticleSchema.pre('save', function(next) {
    let _this = this;
    if ( _this.isNew ) {
        Sequence.increment('Article', (err, result) => {
            if (err) {
                throw err;
            }
            _this.aid = result.value.next;
            next();
        })
    } else {
        next();
    }
})

const Models = {
    User: mongoose.model('User', UserSchema),
    Article: mongoose.model('Article', ArticleSchema),
    Comment: mongoose.model('Comment', CommentSchema)
}

module.exports = Models;
