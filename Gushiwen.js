var objc = JSON.parse($response.body);

    objc = {
  "status": true,
  "statusCode": 200,
  "lastDate": "\/Date(4092599349000)\/",
  "msg": "初始值",
  "vip": "\/Date(1701935043000)\/",
  "imDate": "2023\/11\/7 15:44:25"
}

$done({body : JSON.stringify(objc)});