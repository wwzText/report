import { Http } from '@/api';
import { APP_VERSION } from '@/config/system.config.js';
/**
 * @param {Number, String} timeStamp 需要转化的时间戳
 * @param {String} timeReturnFormat 时间转化格式
 * @param {Boolean} notNeedZero 是否需要补全
 * @description 时间戳转化为时间
 */
export const timeStampToTime = (timeStamp, timeReturnFormat = 'YYYY-MM-DD', notNeedZero = true) => {
    let timeOriginalObj
    if (timeStamp) {
        timeOriginalObj = new Date(timeStamp * 1);
    } else {
        timeOriginalObj = new Date();
    }

    let week = '';
    let getDay = timeOriginalObj.getDay();
    if (getDay == 0) week = "星期日"
    if (getDay == 1) week = "星期一"
    if (getDay == 2) week = "星期二"
    if (getDay == 3) week = "星期三"
    if (getDay == 4) week = "星期四"
    if (getDay == 5) week = "星期五"
    if (getDay == 6) week = "星期六"

    return timeReturnFormat.replace(/YYYY|MM|DD|H|M|S|W/ig, function (matches) {
        return ({
            YYYY: timeOriginalObj.getFullYear(),
            MM: zero(timeOriginalObj.getMonth() + 1, notNeedZero),
            DD: zero(timeOriginalObj.getDate(), notNeedZero),
            H: zero(timeOriginalObj.getHours(), notNeedZero),
            M: zero(timeOriginalObj.getMinutes(), notNeedZero),
            S: zero(timeOriginalObj.getSeconds(), notNeedZero),
            W: week
        })[matches];
    });
}

/**
 * @param {Number, String} num 当前判定值
 * @param { Boolean } notNeedZero 是否需要补全
 * @description 补全日期时间中缺少的0
 */
const zero = (num, notNeedZero) => {
    if (num * 1 < 10 && notNeedZero) {
        return `0${num}`;
    }
    return num
}

/**
 * @description 获取url携带的参数
 */
export const getQueryObj = () => {
    console.log(location.href)
    let query = location.href.split("?")[1].split("&");

    let queryObj = {};
    query.map(item => {
        let itemArr = item.split("=");
        queryObj[itemArr[0]] = decodeURIComponent(itemArr[1]);
    });
    return queryObj;
}

/**
 * @param {ArrayList} ids id列表
 * @description 通过ids获取实际的图片路径
 */
export const getImgOriginalUrl = async (ids) => {
    if (!ids) return null;
    if (!(ids instanceof Array)) {
        ids = [ids]
    }
    // 腾讯云平台上的照片
    let WxImageList = [];

    for (let i = 0; i < ids.length; i++) {
        if (ids[i].indexOf('TCOS') != -1) {

            // TCOS表示这张图片是腾讯云上的照片，前端直接拼接路径
            WxImageList.push({
                key: ids[i],
                value: APP_VERSION === 'dev' ? `https://sfa-dev-1259627966.cos.ap-chengdu.myqcloud.com/${ids[i]}` : `https://sfa-prd-1259627966.cos.ap-chengdu.myqcloud.com/${ids[i]}`
            })
            ids.splice(i, 1);
            i--
        }
    }
    let originalImgObject = [];
    if (ids.length) {
        originalImgObject = await Http.share('getImgOriginal', {
            objectIds: ids
        })
    }

    return [...originalImgObject, ...WxImageList]
}