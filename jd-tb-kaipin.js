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
      if (body) {
  switch (true) {
    // 淘宝-开屏视频广告
    case /^https:\/\/guide-acs\.m\.taobao\.com\/gw\/mtop\.taobao\.cloudvideo\.video\.query/.test(url):
      try {
        let obj = JSON.parse(body);
        if (obj?.data?.duration) {
          obj.data.duration = "0";
        }
        if (obj?.data?.resources?.length > 0) {
          obj.data.resources = [];
        }
        if (obj?.data?.caches?.length > 0) {
          obj.data.caches = [];
        }
        if (obj?.data?.respTimeInMs) {
          obj.data.respTimeInMs = "5364633600000";
        }
        body = JSON.stringify(obj);
      } catch (error) {
        console.log(`淘宝-开屏视频广告, 出现异常: ` + error);
      }
      break;
    // 淘宝-开屏图片广告
    case /^https:\/\/guide-acs\.m\.taobao\.com\/gw\/mtop\.taobao\.wireless\.home\.splash\.awesome\.get/.test(url):
      try {
        let obj = JSON.parse(body);
        if (obj?.data?.containers?.splash_home_base) {
          let splash = obj.data.containers.splash_home_base;
          if (splash?.base?.sections?.length > 0) {
            for (let items of splash.base.sections) {
              if ("taobao-splash" in items.bizData) {
                if (items?.bizData?.["taobao-splash"]?.data?.length > 0) {
                  for (let item of items.bizData["taobao-splash"].data) {
                    item.times = "0";
                    item.hotStart = "false";
                    item.haveVoice = "false";
                    item.hideTBLogo = "false";
                    item.enable4G = "false";
                    item.coldStart = "false";
                    item.waitTime = "0";
                    item.imgUrl = "";
                    item.startTime = "5364633600000";
                    item.endTime = "5364719999000";
                    item.gmtStart = "2140-01-01 00:00:00";
                    item.gmtEnd = "2140-01-01 23:59:59";
                    item.gmtStartMs = "5364633600000";
                    item.gmtEndMs = "5364719999000";
                  }
                }
              }
            }
          }
        }
        body = JSON.stringify(obj);
      } catch (error) {
        console.log(`淘宝-开屏图片广告, 出现异常: ` + error);
      }
      break;
    // 淘宝-开屏活动
    case /^https:\/\/poplayer\.template\.alibaba\.com\/\w+\.json/.test(url):
      try {
        let obj = JSON.parse(body);
        if (obj?.res?.images?.length > 0) {
          obj.res.images = [];
        }
        if (obj?.res?.videos?.length > 0) {
          obj.res.videos = [];
        }
        if (obj?.enable) {
          obj.enable = false;
        }
        if (obj?.mainRes?.images?.length > 0) {
          obj.mainRes.images = [];
        }
        body = JSON.stringify(obj);
      } catch (error) {
        console.log(`淘宝-开屏活动, 出现异常: ` + error);
      }
      break;
  }
  $done({ body });
}