<template>
  <div class="life-main">
    <CrmBgMain :bgType="bgType">
      <swiper
        :options="swiperOptionsObject"
        @slideChangeTransitionEnd="slideChangeTransitionEnd"
      >
        <SwiperSlide>
          <div class="text-main" v-if="initialSlide == 0">
            <p class="text center animate__animated animate__bounce animate__delay-2s">过去的一年，您的平安与焦虑</p>
            <p class="text center">我们记得</p>
            <p class="text center ">过去的一年，您的身影与汗水</p>
            <p class="text center">我们记得</p>
            <p class="text center">过去的一年，您的努力与拼搏</p>
            <p class="text center">我们记得</p>
            <p class="text center">过去的一年，您的笑脸与喜悦</p>
            <p class="text center">我们记得</p>
            <p class="text center">这一刻，请我们一起打开这封属于您的</p>
            <p class="text center">2020年CRM年度账单</p>
          </div>
        </SwiperSlide>
        <!-- 走进一线 -->
        <SwiperSlide>
          <div class="text-main animated fadeIn delay-2s" v-if="initialSlide == 1">
            <p class="text center">走进一线</p>
            <p class="text">
              侯总在年初提出了“五点一线”，年中提倡“深入一线”；“一线”是今年的重中之重，也一直是我们雪花人的制胜法宝，那么，这一年您在一线终端
            </p>
            <div class="swiper2-main">
              <div class="swiper2-item">
                <p class="text">累计拜访了</p>
                <p>
                  <span class="number">{{ detail.total_cishu || 0 }}</span
                  >次终端
                </p>
              </div>
              <div class="swiper2-item">
                <p class="text">累计新增了</p>
                <p>
                  <span class="number">{{ detail.new_ternimal_num || 0 }}</span
                  >家终端
                </p>
              </div>
              <div class="swiper2-item">
                <p class="text">累计修改了</p>
                <p>
                  <span class="number">{{ detail.fix_ternimal_num || 0 }}</span
                  >家终端信息
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <!-- 深耕终端 -->
        <SwiperSlide>
          <div class="text-main">
            <p class="title">深耕终端</p>
            <p class="text left">
              终端做的好坏，有的人说是靠产品，有的人说是靠政策，只有您知道靠的是走心。
            </p>
            <p class="text left">这一年，您在终端身上投入了大量的时间：</p>
          </div>
          <div style="padding-top: 20px" class="text-comp">
            <p class="swiper3-text">
              有<span class="number">{{ detail.tianshu || 0 }}</span
              >天您不顾风雨，不顾酷暑和寒冬，走进一家又一家终端；
            </p>
            <p class="swiper3-text">
              有<span class="number">{{ detail.pic_num || 0 }}</span
              >张照片记录下您对终端的投入与付出；
            </p>
            <p class="swiper3-text">我们知道，您做的还有更多更多</p>
          </div>
        </SwiperSlide>
        <!-- 您的专场 -->
        <SwiperSlide>
          <div class="text-main">
            <p class="title">您的专场</p>
            <p class="number" style="margin-top: 40px" v-if="detail.spec_day">
              {{ detail.spec_day || "0000-00-00" }}
            </p>
            <p class="text">特别的一天</p>
            <p class="text">这一天对我们很普通，对您很特别</p>
            <p class="text">还记得么？</p>
            <p class="swiper4-text" style="margin-top: 20px">
              您忙碌的背影遮住了流下的汗水；
            </p>
            <p class="swiper4-text">
              我们默默的数着您走进走出
              <span class="number">{{ detail.spec_terminal_num || 0 }}</span
              >家终端
            </p>
            <p class="swiper4-text" style="margin-top: 20px">努力看得见</p>
            <p class="swiper4-text">这一年您拜访记录在工作圈被大家点赞了</p>
            <p class="swiper4-text">
              <span class="number">{{ detail.be_praised_num || 0 }}</span
              >次，评论了
              <span class="number">{{ detail.be_commented_num || 0 }}</span
              >次；
            </p>
            <p class="swiper4-text">
              您也去点赞评论了
              <span class="number">{{
                detail.to_prais_num * 1 + detail.to_commented_num * 1 || 0
              }}</span
              >次优秀同事的工作圈；
            </p>
          </div>
        </SwiperSlide>
        <!-- 最时刻 -->
        <SwiperSlide>
          <div class="text-main">
            <p class="title">最时刻</p>
            <p class="text" style="margin-top: 20px">您最常去的终端是：</p>
            <p class="number">{{ detail.xn60 || "无数据" }}</p>
            <p class="text">这家的业务目标都达成了么</p>
            <p class="swiper5-text" style="margin-top: 30px">
              您最早进店的一次是<span class="number">{{ minInObj[1] }}</span
              >月<span class="number">{{ minInObj[2] }}</span
              >日<span class="number">{{ maxInObj[0] }}</span
              >点<span class="number">{{ maxInObj[1] }}</span
              >分进入<span class="number">{{ detail.kd7 }}</span
              >终端
            </p>
            <p class="swiper5-text" style="margin-top: 30px">
              您最晚离开的一次是<span class="number">{{ minOutObj[1] }}</span
              >月<span class="number">{{ minOutObj[2] }}</span
              >日<span class="number">{{ maxOutObj[0] }}</span
              >点<span class="number">{{ maxOutObj[1] }}</span
              >分离开<span class="number">{{ detail.kh7 }}</span
              >终端
            </p>
            <p class="swiper5-text" style="margin-top: 30px">
              您最常去拜访的时间段是<span class="number">{{
                detail.kh8 || 0
              }}</span
              >点到<span class="number">{{ detail.kh8 * 1 + 1 || 0 }}</span
              >点
            </p>
          </div>
        </SwiperSlide>
        <!-- 这一刻，敬自己 -->
        <SwiperSlide>
          <div class="text-main">
            <p class="title" style="margin-bottom: 40px">这一刻，敬自己</p>
            <p class="swiper6-text">
              疫情期间，您也在积极响应国家及公司的复工安排。
            </p>
            <p class="swiper6-text" style="margin-top: 30px">
              在<span class="number">{{ fristVisitObj[1] }}</span
              >月<span>{{ fristVisitObj[2] }}</span
              >日您便开始了疫情期间的第一次拜访。
            </p>
            <!-- <p class="swiper6-text">
              这期间，您拜访了
              <span class="number">1</span
              >家终端，安抚终端担扰，告诉他们我们雪花与您们同在；
            </p> -->
            <p class="swiper6-text" style="margin-top: 30px">
              这期间，您有<span class="number">{{
                detail.sickness_visit_days || 0
              }}</span
              >天是在市场上奔波，一箱箱雪花啤酒再次铺进终端，送到消费者面前。
            </p>
          </div>
        </SwiperSlide>
        <!-- 勋章墙 -->
        <SwiperSlide v-if="detail.xunzhan.length">
          <div class="text-main">
            <p class="title" style="margin-bottom: 40px">点亮您的勋章</p>
            <div class="medal-main">
              <img
                @click="medalCondition('叫我战神', 'jwzs')"
                v-if="detail.xunzhan.indexOf('叫我战神') != -1"
                :src="jwzs"
                class="medal-item"
              />
              <img
                @click="medalCondition('我是前辈', 'wsqb')"
                v-if="detail.xunzhan.indexOf('我是师哥/师姐') != -1"
                :src="wsqb"
                class="medal-item"
              />
              <img
                @click="medalCondition('看我C位', 'kwcw')"
                v-if="detail.xunzhan.indexOf('看我C位') != -1"
                :src="kwcw"
                class="medal-item"
              />
              <img
                @click="medalCondition('抗疫勇士', 'kyys')"
                v-if="detail.xunzhan.indexOf('抗疫勇士') != -1"
                :src="kyys"
                class="medal-item"
              />
              <img
                @click="medalCondition('夜猫子', 'ymz')"
                v-if="detail.xunzhan.indexOf('夜猫子') != -1"
                :src="ymz"
                class="medal-item"
              />
              <img
                @click="medalCondition('千户侯', 'qhh')"
                v-if="detail.xunzhan.indexOf('千户侯') != -1"
                :src="qhh"
                class="medal-item"
              />
              <img
                @click="medalCondition('千手美拍', 'qsmp')"
                v-if="detail.xunzhan.indexOf('千手美拍') != -1"
                :src="qsmp"
                class="medal-item"
              />
              <img
                @click="medalCondition('全能高手', 'qngs')"
                v-if="detail.xunzhan.indexOf('全能高手') != -1"
                :src="qngs"
                class="medal-item"
              />
              <img
                @click="medalCondition('送赞干部', 'szgb')"
                v-if="detail.xunzhan.indexOf('送赞干部') != -1"
                :src="szgb"
                class="medal-item"
              />
              <img
                @click="medalCondition('明察秋毫', 'mcqh')"
                v-if="detail.xunzhan.indexOf('明察秋毫') != -1"
                :src="mcqh"
                class="medal-item"
              />
              <img
                @click="medalCondition('忘我工作', 'wwgz')"
                v-if="detail.xunzhan.indexOf('忘我工作') != -1"
                :src="wwgz"
                class="medal-item"
              />
              <img
                @click="medalCondition('小萌新', 'xmx')"
                v-if="detail.xunzhan.indexOf('小萌新') != -1"
                :src="xmx"
                class="medal-item"
              />
              <img
                @click="medalCondition('早起鸟', 'zqn')"
                v-if="detail.xunzhan.indexOf('早起鸟') != -1"
                :src="zqn"
                class="medal-item"
              />
              <img
                @click="medalCondition('我是师哥', 'wssg')"
                v-if="detail.xunzhan.indexOf('我是师哥') != -1"
                :src="wssg"
                class="medal-item"
              />
              <img
                @click="medalCondition('我是师姐', 'wssj')"
                v-if="detail.xunzhan.indexOf('我是师姐') != -1"
                :src="wssj"
                class="medal-item"
              />
            </div>
          </div>
        </SwiperSlide>
        <!-- flag -->
        <SwiperSlide v-if="!isWx || (isWx && chooseFlagList.length)">
          <div class="text-main">
            <p class="title" style="margin-bottom: 40px">立下新年目标</p>
            <div class="flag-main">
              <div class="choose-flag-main">
                <p class="text">2021年，我想要</p>
                <span
                  class="flag-item"
                  v-for="(item, index) in chooseFlagList"
                  @click="removeFlag(index)"
                  :key="index"
                  >{{ item }}</span
                >
              </div>
              <div class="unchoose-flag-main" v-if="!isWx">
                <div class="unchoose-flag-contaion">
                  <span
                    class="flag-item"
                    :key="index"
                    @click="chooseFlag(item)"
                    v-for="(item, index) in flagList"
                    >{{ item }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <!-- 展望与寄语 -->
        <SwiperSlide>
          <div class="text-main">
            <p class="title" style="margin-bottom: 40px">展望与寄语</p>
            <p class="swiper7-text">
              今天是CRM陪伴您走过的第<span class="number">{{
                detail.days_crm || 0
              }}</span
              >天
            </p>
            <p class="swiper7-text">
              也是2021年的第<span class="number">{{ crd }}</span
              >天
            </p>
            <p class="text" style="margin-top: 20px">
              CRM作为公司终端信息化管理工具，
            </p>
            <p class="text">
              我们一直想让自己更懂您、更赋能与业务、更友好、更便捷，当然也要更快更准。
            </p>
            <p class="text">
              也祝您在新的一年工作顺利，万事如意；携手决战高端，开创美好未来。
            </p>
          </div>
        </SwiperSlide>
        <!-- 上传照片 -->
        <!-- <SwiperSlide v-if="!isWx || (isWx && bestImg)">
          <div class="text-main">
            <p class="title" style="margin-bottom: 40px">雪花最牛陈列评选</p>
            <div class="file-btn-main" @click="chooseBestImg">
              <input
                type="file"
                class="file-actual-btn"
                accept="image/*" 
                ref="imgChange"
                @change="chooseImage"
              />
              <img v-if="!bestImg" :src="uploadImg" class="hypothesis-btn" />
              <img v-if="bestImg" :src="bestImg" class="best-img" />
              <p>{{ bestImg }}</p>
              <p
                v-if="!bestImg && !isWx"
                style="
                  color: white;
                  text-align: center;
                  top: 112px;
                  position: absolute;
                  left: 0;
                  right: 0;
                  font-size: 15px;
                "
              >
                上传您最牛的陈列
              </p>
            </div>
            <button class="remove-img-btn" v-if="!isWx && upLoadKey" @click="delPhoto">删除照片</button>
            <div class="good-btn" @click="good">
              <img :src="goodImg" class="good-img" />
            </div>
            <p class="text center">
              获赞 {{ detail.most_photo_be_parisd || 0 }}
            </p>
          </div>
        </SwiperSlide> -->
      </swiper>
    </CrmBgMain>

    <!-- 勋章获取条件弹出框 -->
    <div class="condition-main" v-if="showXunzhang" @click="hideXunzhang">
      <div class="condition-view">
        <img
          :src="jwzs"
          v-if="xunzhangDetail.imgName == 'jwzs'"
          class="medal-item"
        />
        <img
          :src="kwcw"
          v-if="xunzhangDetail.imgName == 'kwcw'"
          class="medal-item"
        />
        <img
          :src="kyys"
          v-if="xunzhangDetail.imgName == 'kyys'"
          class="medal-item"
        />
        <img
          :src="mmgy"
          v-if="xunzhangDetail.imgName == 'mmgy'"
          class="medal-item"
        />
        <img
          :src="qhh"
          v-if="xunzhangDetail.imgName == 'qhh'"
          class="medal-item"
        />
        <img
          :src="qsmp"
          v-if="xunzhangDetail.imgName == 'qsmp'"
          class="medal-item"
        />
        <img
          :src="qngs"
          v-if="xunzhangDetail.imgName == 'qngs'"
          class="medal-item"
        />
        <img
          :src="szgb"
          v-if="xunzhangDetail.imgName == 'szgb'"
          class="medal-item"
        />
        <img
          :src="mcqh"
          v-if="xunzhangDetail.imgName == 'mcqh'"
          class="medal-item"
        />
        <img
          :src="wwgz"
          v-if="xunzhangDetail.imgName == 'wwgz'"
          class="medal-item"
        />
        <img
          :src="whzx"
          v-if="xunzhangDetail.imgName == 'whzx'"
          class="medal-item"
        />
        <img
          :src="xmx"
          v-if="xunzhangDetail.imgName == 'xmx'"
          class="medal-item"
        />
        <img
          :src="ywdn"
          v-if="xunzhangDetail.imgName == 'ywdn'"
          class="medal-item"
        />
        <img
          :src="ymz"
          v-if="xunzhangDetail.imgName == 'ymz'"
          class="medal-item"
        />
        <img
          :src="zqn"
          v-if="xunzhangDetail.imgName == 'zqn'"
          class="medal-item"
        />
        <img
          :src="wsqb"
          v-if="xunzhangDetail.imgName == 'wsqb'"
          class="medal-item"
        />
        <div class="condition-text">
          <p class="condition-title">解锁条件：</p>
          <p class="medal-text" style="margin-bottom: 20px">
            {{ xunzhangDetail.condition }}
          </p>
          <p class="medal-text">
            已有 <span class="medal-number">{{ xunzhangDetail.num }}</span
            >人获得勋章「{{ xunzhangDetail.xunzhang }}」
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import "animate.css";
import COS from "@/assets/cos-js-sdk-v5.min.js";
import { APP_VERSION } from "@/config/system.config.js";
import {
  timeStampToTime,
  getImgOriginalUrl,
  getQueryObj,
} from "@/utils/index.js";

const jwzs = require("./../../assets/img/crm_life/jwzs.png");
const kwcw = require("./../../assets/img/crm_life/kwcw.png");
const kyys = require("./../../assets/img/crm_life/kyys.png");
const mmgy = require("./../../assets/img/crm_life/mmgy.png");
const qhh = require("./../../assets/img/crm_life/qhh.png");
const qsmp = require("./../../assets/img/crm_life/qsmp.png");
const qngs = require("./../../assets/img/crm_life/qngs.png");
const szgb = require("./../../assets/img/crm_life/szgb.png");
const mcqh = require("./../../assets/img/crm_life/mcqh.png");
const wwgz = require("./../../assets/img/crm_life/wwgz.png");
const xmx = require("./../../assets/img/crm_life/xmx.png");
const wsqb = require("./../../assets/img/crm_life/wsqb.png");
const ymz = require("./../../assets/img/crm_life/ymz.png");
const zqn = require("./../../assets/img/crm_life/zqn.png");

const uploadImg = require("./../../assets/img/crm_life/upload.png");
const goodImg = require("./../../assets/img/crm_life/good.png");

import CrmBgMain from "@/components/crmLife/crmBgMain";

import { Http } from "@/api";

let swiperOptions = {
  width: window.innerWidth,
  zoom: true,
  initialSlide: 0,
  direction: "vertical",
  on: {
    slideChangeTransitionEnd() {
      this.initialSlide = this.activeIndex;
    },
  },
};
export default {
  components: {
    Swiper,
    SwiperSlide,
    CrmBgMain,
  },
  data() {
    return {
      crd: timeStampToTime("", "DD"),
      jwzs,
      kwcw,
      wsqb,
      kyys,
      mmgy,
      qhh,
      qsmp,
      qngs,
      szgb,
      mcqh,
      wwgz,
      xmx,
      ymz,
      zqn,
      uploadImg,
      goodImg,
      swiperOptionsObject: swiperOptions,
      initialSlide: 0,
      bgType: 1,
      detail: {
        xunzhan: [],
      },
      queryObj: null,
      minInObj: ["-", "-", "-"],
      maxInObj: ["-", "-", "-"],
      minOutObj: ["-", "-", "-"],
      maxOutObj: ["-", "-", "-"],
      fristVisitObj: ["-", "-", "-"],

      xunzhangDetail: {},
      showXunzhang: false,

      // 新年寄语列表
      flagList: [
        "好事连轴转",
        "牛气冲天",
        "学会倾听",
        "通透豁达",
        "水逆走开",
        "多陪父母",
        "脱脂不脱发",
        "有钱有闲",
        "培养一个新爱好",
        "寻找初心",
        "平安喜乐",
        "抗压抗锤",
        "被宠爱",
        "锦鲤附体",
        "牛气冲天",
        "别墅靠大海",
        "把自己嫁出去",
        "车牌到手",
        "不皱眉多微笑",
      ],
      // 已选择寄语列表
      chooseFlagList: [],

      // 显示用的最牛图片完整地址
      bestImg: "",

      // 上传最牛图片用的key
      upLoadKey: "",
    };
  },

  created() {
    document.title = "2020年CRM年度用户报告";
    this.queryObj = getQueryObj();
    this.isWx = this.queryObj.isWx || false;
    this.getCrmDetail();
  },

  methods: {
    chooseBestImg() {
      this.$refs.imgChange.click();
    },

    async delPhoto() {
      if (this.upLoadKey) {
        await Http.share("delPhoto", {
          appuser: this.queryObj.account,
          name: this.queryObj.appuser,
          photoid: this.upLoadKey,
        });
        this.bestImg = "";
        this.upLoadKey = "";
        this.detail.most_photo_be_parisd = 0;
      }
    },
    async getCrmDetail() {
      this.$showLoading();
      let crmLifeDetail = await Http.share("getCrmDetail", {
        appuser: this.queryObj.account,
        name: this.queryObj.appuser,
      });
      if (!crmLifeDetail) {
        this.$hideLoading();
        return;
      }
      this.chooseFlagList = crmLifeDetail.year_flag
        ? crmLifeDetail.year_flag.split(",")
        : [];
      this.bestImg = crmLifeDetail.most_photo
        ? "https://" + crmLifeDetail.most_photo
        : "";
      this.upLoadKey = crmLifeDetail.most_photo || "";
      this.minInObj =
        crmLifeDetail.kd4 !== "00000000"
          ? crmLifeDetail.kd4.split("-")
          : ["-", "-", "-"];
      this.maxInObj =
        crmLifeDetail.kd5 !== "00:00:00"
          ? crmLifeDetail.kd5.split(":")
          : ["-", "-", "-"];
      this.minOutObj =
        crmLifeDetail.kh4 !== "00000000"
          ? crmLifeDetail.kh4.split("-")
          : ["-", "-", "-"];
      this.maxOutObj =
        crmLifeDetail.kh5 !== "00:00:00"
          ? crmLifeDetail.kh5.split(":")
          : ["-", "-", "-"];
      this.fristVisitObj = crmLifeDetail.sickness_first_visit
        ? crmLifeDetail.sickness_first_visit.split("-")
        : ["-", "-", "-"];
      this.detail = crmLifeDetail;
      this.$hideLoading();
    },
    slideChangeTransitionEnd(e) {
      let index = e.activeIndex;
      if (index <= 4) {
        this.bgType = 1;
      } else {
        this.bgType = 2;
      }
      this.initialSlide = index;
    },
    chooseImage(e) {
      let that = this;
      if (that.isWx) return;
      this.$showLoading();
      let fileObj = e.target.files[0];
      let cos = new COS({
        SecretId: "AKIDGL9i05cRjmgGXgnbO1mTtMYhDarqs26A",
        SecretKey: "6TZ4GWkHSmqeCTje1KEsEJPNIwKRcvGb",
      });
      if (!fileObj) {
        this.$hideLoading();
        return;
      }

      let name = fileObj.name;
      let imgType = name.substr(name.lastIndexOf("."));
      let timestamp = Date.parse(new Date());
      let curDate = timeStampToTime("", "YYYY-MM-DD");
      let Key = `TCOS/crmLife/${curDate.replace(/-/g, "")}/${curDate.replace(
        /-/g,
        ""
      )}${timestamp}${imgType}`;
      cos.putObject(
        {
          Bucket: "sfa-" + APP_VERSION + "-1259627966",
          Region: "ap-chengdu",
          Key,
          Body: fileObj,
        },
        function (err, data) {
          if (data) {
            getImgOriginalUrl(data.Location).then((imgRes) => {
              that.bestImg = "https://" + imgRes[0].key;
              that.upLoadKey = imgRes[0].key;
              that.uploadImgToServe();
            });
          }
        }
      );
    },

    // 上传照片去服务器
    async uploadImgToServe() {
      getQueryObj();
      await Http.share("addPhoto", {
        appuser: this.queryObj.account,
        name: this.queryObj.appuser,
        photoid: this.upLoadKey,
      });
      this.$hideLoading();
    },

    // 查看勋章解锁条件
    async medalCondition(key, img) {
      let back = await Http.share("getXunzhangInfo", {
        xunzhang: key,
      });
      back.data["imgName"] = img;
      this.xunzhangDetail = back.data;
      this.showXunzhang = true;
    },

    // 隐藏勋章条件
    hideXunzhang() {
      this.showXunzhang = false;
    },

    // 选择年度寄语
    async chooseFlag(flag) {
      if (this.chooseFlagList.indexOf(flag) == -1) {
        this.$showLoading();
        let reqList = [...this.chooseFlagList, flag];
        let yearflag = reqList.join(",");

        await Http.share("addFlag", {
          appuser: this.queryObj.account,
          name: this.queryObj.appuser,
          yearflag,
        });
        this.chooseFlagList = reqList;
        this.$hideLoading();
      }
    },

    // 移除年度寄语
    async removeFlag(index) {
      if (this.isWx) {
        return;
      }
      this.$showLoading();
      this.chooseFlagList.splice(index, 1);
      let yearflag = this.chooseFlagList.join(",");
      await Http.share("addFlag", {
        appuser: this.queryObj.account,
        name: this.queryObj.appuser,
        yearflag,
      });
      this.$hideLoading();
    },

    async good() {
      if (this.isWx && !localStorage.getItem("isGood")) {
        await Http.share("good", {
          appuser: this.queryObj.account,
          name: this.queryObj.appuser,
        });
        localStorage.setItem("isGood", true);
        this.detail.most_photo_be_parisd += 1;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./../../assets/css/animate.min.css");
@import url("./index.less");
</style>
