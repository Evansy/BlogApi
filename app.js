const express = require("express");

// gzip处理模块
const compression = require('compression');

// 加载模板处理模块
// var swig = require('swig');
// 初始化自定义环境变量
const env = require('node-env-file');
env(__dirname + '/.env');

// 加载数据库模块
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// 处理前端提交过来的数据
const bodyParser = require('body-parser');

//加载cookies模块
const Cookies = require('cookies');

// 创建app应用 => NodeJs
const app = express();

// 所有接口信息
const route = require('./routers');

// 初始化用户所需依赖
const Models = require('./database');
const rand = require('csprng');
const sha1 = require('sha1');

// 创建应用模板
// 第一个参数：模板引擎的名称，同事也是模板文件的后缀，第二个参数表示用于u解析处理模板内容的方法
// app.engine('html', swig.renderFile);

// 设置模板文件存放的目录，第一个必须是views，第二个参数是目录
// app.set('views', './views');

// 注册所使用的模板引擎，第一个参数必须是view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称一致
// app.set('view engine', 'html');

// 在开发过程中，需要取消模板缓存
// swig.setDefaults({cache:false});

//  bodyparse设置
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// 处理gzip
app.use(compression({filter: function(req, res) {
    if (req.headers['x-no-compression']) {
      // 这里就过滤掉了请求头包含'x-no-compression'
      return false
    }
  
    return compression.filter(req, res)
  }
}));

//设置跨域访问
app.all('*', function(req, res, next) {
    if( req.headers.origin.indexOf("iskcy" != -1) ){ 
        res.header("Access-Control-Allow-Origin", req.headers.origin);
    } 
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");

    if (req.method == 'OPTIONS') {
        res.status(200).send();    /* 让options请求快速返回 */
    } else {
        next();
    }
});

// 默认路由返回显示
app.get('/', function(req, res) {
    // res.header({"Content-Type": "text/html"});
    res.send('欢迎访问博客API！');
});

route(app);

// 初始化数据
const initialize = () => {
    console.log('beginning to initialize data...');
    Models.User.find({}, (err, doc) => {
        if(err){
            console.log('init error', err);
            console.log('initialize failed!');
        } else if (!doc.length) {
            const salt = rand(160, 36);
            // 第一次创建站长账户
            new Models['User']({username: process.env.INIT_USER, password: sha1(process.env.INIT_PASSWORD + salt), salt: salt}).save();
            // console.log('Initialize User Success, Username: boss, password: 12346');
        } else {
            console.log('initialize successfully');
        }
    });
}

//监听http请求
var port = 8888;
var uri = 'http://localhost:' + port;

// 创建数据库链接
// mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@localhost:27017/blog`);
mongoose.connect(`mongodb://localhost:27017/blog`);

// 存储链接对象
const db = mongoose.connection;

// 错误监听
db.on('error', console.log.bind(console, 'DataBase connection error'));

// 链接成功钩子
db.once('open', () => {
    console.log('The DataBase has connected.');
    initialize();
    app.listen(port);
    console.log('> Listening at ' + uri + '\n');
});

// 第一个参数 连接的协议和地址
// mongoose.connect('mongodb://localhost:27017/blog',function (err) {
//     if(err){
//         console.log('数据库连接失败');
//     }else{
//         console.log('数据库连接成功');
//         app.listen(port);
//         console.log('> Listening at ' + uri + '\n');
//         // opn(uri)
//     }
// });
