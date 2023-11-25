/**********************************************

> 应用名称：555去广告脚本
> 脚本说明：去除首页轮播图广告、首页信息流广告、我的页面推广


[rewrite_local]

^https?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+){1,3}(:\d+)?\/api\/v\d\/movie\/index_recommend url script-response-body https://raw.githubusercontent.com/2023djash/Surge/main/555Ad.js
^https?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+){1,3}(:\d+)?\/api\/v\d\/advert url reject

[mitm]

hostname = run.api.qyfxgd.cn, *.weilai555.com, *.ecoliving168.com

**********************************************/



















let obj=JSON.parse($response.body);obj.data=obj.data.filter(t=>"advert_self"!==t.layout),obj.data.forEach(t=>{t.list=t.list.filter(t=>3!==t.type)}),$done({body:JSON.stringify(obj)});