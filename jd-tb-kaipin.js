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
            // orderIdFloor我的订单 keyToolsFloor浏览记录 newWalletIdFloor我的钱包 iconToolFloor底部工具栏
            const items = [
              "bigSaleFloor", // 双十一
              "buyOften", // 常买常逛
              "newAttentionCard", // 关注的频道
              "newBigSaleFloor", // 双十一
              "noticeFloor", // 顶部横幅
              "recommendfloor" // 我的推荐
            ];
            if (items?.includes(floor?.mId)) {
              continue;
            } else {
              if (floor?.mId === "basefloorinfo") {
                // 弹窗
                if (floor?.data?.commonPopup) {
                  delete floor.data.commonPopup;
                }
                // 底部会员续费横幅
                if (floor?.data?.commonTips?.length > 0) {
                  floor.data.commonTips = [];
                }
                // 弹窗
                if (floor?.data?.commonWindows?.length > 0) {
                  floor.data.commonWindows = [];
                }
                // 右下角动图
                if (floor?.data?.floatLayer) {
                  delete floor.data.floatLayer;
                }
              } else if (floor?.mId === "orderIdFloor") {
                if (floor?.data?.commentRemindInfo?.infos?.length > 0) {
                  // 发布评价的提醒
                  floor.data.commentRemindInfo.infos = [];
                }
              } else if (floor?.mId === "userinfo") {
                // 顶部背景图 去掉会导致顶部黑字在黑暗模式中无法显示 暂时保留
                // if (floor?.data?.bgImgInfo?.bgImg) {
                //   delete floor.data.bgImgInfo.bgImg;
                // }
                // 开通plus会员卡片
                if (floor?.data?.newPlusBlackCard) {
                  delete floor.data.newPlusBlackCard;
                }
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