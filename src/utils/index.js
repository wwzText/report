import { Http } from '@/api';
/**
 * @param {Number, String} timeStamp 需要转化的时间戳
 * @param {String} timeReturnFormat 时间转化格式
 * @param {Boolean} notNeedZero 是否需要补全
 * @description 时间戳转化为时间
 */
export const timeStampToTime = (timeStamp, timeReturnFormat = 'YYYY-MM-DD', notNeedZero = true) => {
    var timeOriginalObj = new Date(timeStamp * 1);
    let week = '';
    let getDay = timeOriginalObj.getDay();
    if(getDay == 0) week = "星期日"
    if(getDay == 1) week = "星期一"
    if(getDay == 2) week = "星期二"
    if(getDay == 3) week = "星期三"
    if(getDay == 4) week = "星期四"
    if(getDay == 5) week = "星期五"
    if(getDay == 6) week = "星期六"

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
    let query = location.href.split("?")[1].split("&");
    let queryObj = {};
    query.map(item => {
        let itemArr = item.split("=");
        queryObj[itemArr[0]] = itemArr[1];
    });
    return queryObj;
}

/**
 * @param {ArrayList} ids id列表
 * @description 通过ids获取实际的图片路径
 */
export const getImgOriginalUrl = async (ids) => {

    if (!(ids instanceof Array)) {
        ids = [ids]
    }

    let originalImgObject = await Http.share('getImgOriginal', {
        objectIds: ids
    })
    
    return originalImgObject
}