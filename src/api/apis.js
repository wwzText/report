const getWebTime = '/heineKen/getTimestamp';
const getWorkCircleDetail = '/h5/report/getVisitWorkCircleDetail'; // 获取工作圈详情
const getImgOriginal = '/heineKen/getPicUrlByPhotoIds'; // 获取头像

// 拜访
const ZD_BF_DR_RY = '/h5/report/getIF8196Lst'; // 终端-拜访-当日-人员
const ZD_BF_DR_ZZ = '/h5/report/getIF8198Lst'; // 终端-拜访-当日-组织
const ZD_BF_DY_RY = '/h5/report/getIF8197Lst'; // 终端-拜访-当月-人员
const ZD_BF_DY_ZZ = '/h5/report/getIF8199Lst'; // 终端-拜访-当月-组织
const JXS_BF_DY_RY = '/h5/report/getIF8206Lst'; // 经销商-拜访-当月-人员
const JXS_BF_DR_RY = '/h5/report/getIF8205Lst'; // 经销商-拜访-当日-人员
const JXS_BF_DR_ZZ = '/h5/report/getIF8207Lst'; // 经销商-拜访-当日-组织
const JXS_BF_DY_ZZ = '/h5/report/getIF8208Lst'; // 经销商-拜访-当月-组织
// 走访
const ZD_ZF_DR_RY = '/h5/report/getIF8184Lst'; // 终端-走访-当日-人员
const ZD_ZF_DY_RY = '/h5/report/getIF8185Lst'; // 终端-走访-当月-人员
const ZD_ZF_DR_ZZ = '/h5/report/getIF8188Lst'; // 终端-走访-当日-组织
const ZD_ZF_DY_ZZ = '/h5/report/getIF8189Lst'; // 终端-走访-当月-组织
const JXS_ZF_DR_RY = '/h5/report/getIF8186Lst'; //经销商-走访-当日-人员
const JXS_ZF_DY_RY = '/h5/report/getIF8187Lst'  // 经销商-走访-当月-人员
const JXS_ZF_DR_ZZ = '/h5/report/getIF8190Lst'; // 经销商-走访-当日-组织
const JXS_ZF_DY_ZZ = '/h5/report/getIF8191Lst'; // 经销商-走访-当月-组织

const ZD_DC_DR_RY = '/h5/report/getIF8192Lst'; // 终端-督查-当日-人员
const ZD_DC_DY_RY = '/h5/report/getIF8193Lst'; // 终端-督查-当月-人员
const ZD_DC_DR_ZZ = '/h5/report/getIF8194Lst'; // 终端-督查-当日-组织
const ZD_DC_DY_ZZ = '/h5/report/getIF8195Lst'; // 终端-督查-当月-组织
const JXS_DC_DR_RY = '/h5/report/getIF8186Lst'; //经销商-走访-当日-人员
const JXS_DC_DY_RY = '/h5/report/getIF8187Lst'  // 经销商-走访-当月-人员
const JXS_DC_DR_ZZ = '/h5/report/getIF8190Lst'; // 经销商-走访-当日-组织
const JXS_DC_DY_ZZ = '/h5/report/getIF8191Lst'; // 经销商-走访-当月-组织

const getOrganizationList = '/h5/report/getIF8119Lst'; // 获取组织人员列表
const getOrgInfo = '/h5/report/getOrgInfo'; // 获取组织结构
const getVisitRecordList = '/h5/report/getWorkCircleVisitMessages'; // 获取拜访记录列表
const getVisitDetail = '/h5/report/getWorkCircleTerminalVisitAndSupervisorDetail'; // 获取督导工作详情

const getCrmDetail = '/summary/getCrmLifeInfo'; // 获取CRM人生详情
const getXunzhangInfo = '/summary/getXunzhangInfo'; // 获取勋章详情
const addFlag = '/summary/addYearflag'; // 新增flag
const addPhoto = '/summary/addPhoto'; // 新增最牛图片
const delPhoto = '/summary/deletePhoto'; // 删除最牛照片
const good = '/summary/addParis'; // 点赞

module.exports = {
    getWebTime,
    getWorkCircleDetail,
    getImgOriginal,

    ZD_BF_DR_RY,
    ZD_BF_DR_ZZ,
    ZD_BF_DY_RY,
    ZD_BF_DY_ZZ,
    JXS_BF_DY_RY,
    JXS_BF_DR_RY,

    ZD_ZF_DR_RY,
    ZD_ZF_DY_RY,
    JXS_BF_DR_ZZ,
    JXS_BF_DY_ZZ,
    ZD_ZF_DR_ZZ,
    ZD_ZF_DY_ZZ,
    JXS_ZF_DR_RY,
    JXS_ZF_DY_RY,
    JXS_ZF_DR_ZZ,
    JXS_ZF_DY_ZZ,
    ZD_DC_DR_RY,
    ZD_DC_DY_RY,
    ZD_DC_DR_ZZ,
    ZD_DC_DY_ZZ,
    JXS_DC_DR_RY,
    JXS_DC_DY_RY,
    JXS_DC_DR_ZZ,
    JXS_DC_DY_ZZ,
    getOrganizationList,
    getOrgInfo,
    getVisitRecordList,
    getVisitDetail,

    getCrmDetail,
    getXunzhangInfo,
    addFlag,
    addPhoto,
    delPhoto,
    good
}