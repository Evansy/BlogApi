const express = require('express');
const router = express.Router();
const db = require('../database');

/**
    @apiVersion 1.0.0
    @api {get} /api/tags  文章标签。
    @apiDescription 根据查询条件分页查询区域运营商账号接口。
    @apiName Search
    @apiGroup Account
    @apiPermission Public
    @apiParam {Int} PageIndex 必填项，页码。
    @apiParam {Int} PageSize  必填项，页大小。
    @apiParam {Object} Filters  可填项，筛选条件集合。
        筛选的字段:{
                Username,  // 运营商账号
                Name,	   // 运营商姓名
                RoleId     // 角色Id
        }
    @apiParam {Object} Sortings  可填项，排序成员集合。
        排序成员:{
                CreatedTime	// 创建时间
        }

    @apiParamExample 请求示例
    {
        "Params": {
            "PageIndex": 1,
            "PageSize": 10,
            "Filters": [
                    {"name":"Keywords", "value":"hello"}
            ],
            "Sortings": [{
                "Name": "CreatedTime",
                "Mode": "DESC"
            }]
        }
    }

    @apiSuccessExample {json} 正确输出：
    {
        "Code": 1,
        "Message": "成功。",
        "Content": {
        "RecordCount": 1,
        "PageCount": 1,
        "Records": [
            {
                "AccountId": "6397330173695492096",
            "OperatorId": "6397330173712269313",
            "AreaId": 440305,
            "Username": "hello3",
            "OldPassword": null,
            "Password": "047E145CD8D3172C7CB235F5CCFBDBA1",
            "Name": "你好",
            "Gender": false,
            "Mobile": "13252368568",
            "Email": "123@qq.com",
            "AvatarUrl": "newlife.remote:/data/files/image/20170316-163709-2110651373.jpg",
            "AvatarShowUrl": "http://storages.t.quanxinshenghuo.net/file?path=/data/files/image/20170316-163709-2110651373.jpg",
            "Status": 1,
            "Remark": null,
            "CreatedTime": "2017-03-14 20:28:22",
            "LastLoginTime": null,
            "LastLoginIP": null,
            "IsMaster": false,
            "Members": [],
            "IsModifySelf": false
            }
        ]
        },
        "ServerTime": "2017-03-14 21:09:29"
    }

    @apiErrorExample {json} 错误输出:
    {
        "Code": 错误代号,
        "Message": "错误描述"
    }
*/
router.get('/api/tags', (req, res) => {
    db.Article.find({isPublish: true}).distinct('tags', (err, doc) => {
        if(err){
            console.log(errr)
        } else if (doc) {
            res.send(doc);
        }
    })
})

module.exports = router;
