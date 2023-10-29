/*
脚本引用https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/myBlockAds.js
*/
// 2023-10-28 19:25

if (!$response.body) $done({});
const url = $request.url;
let body = $response.body;

if (body) {
  switch (true) {
    // 京东-个人主页
    case /^https:\/\/api\.m\.jd\.com\/client\.action\?functionId=personinfoBusiness/.test(url):
      try {
        let obj = JSON.parse(body);
        if (obj?.floors?.length > 0) {
          let newFloors = [];
          for (let floor of obj.floors) {
            const items = [
              "bigSaleFloor",
              // "iconToolFloor", // 京东农场 客服服务
              // "newAttentionCard", // 关注的频道
              "newBigSaleFloor", // 双十一
              "noticeFloor", // 顶部横幅 会员优惠
              "recommendfloor" // 专属推荐
            ];
            if (items?.includes(floor?.mId)) {
              continue;
            } else {
              if (floor?.mId === "basefloorinfo") {
                // 弹窗
                if (floor?.data?.commonPopup) {
                  delete floor.data.commonPopup;
                }
                // 弹窗
                if (floor?.data?.commonWindows?.length > 0) {
                  floor.data.commonWindows = [];
                }
              } else if (floor?.mId === "userinfo") {
                // 顶部背景图
                if (floor?.data?.bgImgInfo?.bgImg) {
                  delete floor.data.bgImgInfo.bgImg;
                }
                // 开通plus会员卡片
                // if (floor?.data?.newPlusBlackCard) {
                // delete floor.data.newPlusBlackCard;
                // }
              }
              newFloors.push(floor);
            }
          }
          obj.floors = newFloors;
        }
        body = JSON.stringify(obj);
      } catch (error) {
        console.log(`京东-个人主页, 出现异常: ` + error);
      }
      break;
    // 京东-开屏广告
    case /^https:\/\/api\.m\.jd\.com\/client\.action\?functionId=start/.test(url):
      try {
        let obj = JSON.parse(body);
        if (obj?.images?.length > 0) {
          obj.images = [];
        }
        if (obj?.showTimesDaily) {
          obj.showTimesDaily = 0;
        }
        body = JSON.stringify(obj);
      } catch (error) {
        console.log(`京东-开屏广告, 出现异常: ` + error);
      }
      break;
  }
  $done({ body });
}