/*************************

脚本名称: 甲子算命
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

**************************

[rewrite_local]

^https:\/\/app.iyzbz.com\/app\/user\/selfinfo url script-response-body https://raw.githubusercontent.com/2023djash/Surge/main/Jiazisuanming.js

[mitm] 

hostname = app.iyzbz.com

*******************************/

var = JSON.parse($response.body);
data.memberLevel = 1;
data.userName = "甲子算命";
data.expireTime = "2088-08-08 22:22:22.00+08:00";
$done({body : JSON.stringify});