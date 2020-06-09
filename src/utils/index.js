/**
 * @param {Number, String} timeStamp 需要转化的时间戳
 * @param {String} timeReturnFormat 时间转化格式
 * @param {Boolean} notNeedZero 是否需要补全
 * @description 时间戳转化为时间
 */
export const timeStampToTime = (timeStamp, timeReturnFormat = 'YYYY-MM-DD', notNeedZero = true) => {
    var timeOriginalObj = new Date(timeStamp * 1);
    
    return timeReturnFormat.replace(/YYYY|MM|DD|H|M|S/ig, function (matches) {
        return ({
            YYYY: timeOriginalObj.getFullYear(),
            MM: zero(timeOriginalObj.getMonth() + 1, notNeedZero),
            DD: zero(timeOriginalObj.getDate(), notNeedZero),
            H: zero(timeOriginalObj.getHours(), notNeedZero),
            M: zero(timeOriginalObj.getMinutes(), notNeedZero),
            S: zero(timeOriginalObj.getSeconds(), notNeedZero)
        })[matches];
    });
}

/**
 * @param {Number, String} num 当前判定值
 * @param { Boolean } notNeedZero 是否需要补全
 * @description 补全日期时间中缺少的0
 */
const zero = (num, notNeedZero) => {
    if(num * 1 < 10 && notNeedZero) {
        return `0${num}`;
    }
    return num
}
