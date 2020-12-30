<template>
  <div class="work-share-container">
    <div class="address-time-container">
      <div class="address-main">
        <img :src="typeImg" alt />
        <span class="terminal_name"
          >{{ shareData.terminal_name }}/{{ shareData.zzdhzxz_txt }}</span
        >
      </div>
      <div class="leave-time-container">
        <span class="iconfont iconqiandao-01"></span>
        <span class="leave-time-detail">{{ shareData.visit_in_time }} --</span>
        <span class="iconfont iconqiantui-01"></span>
        <span class="leave-time-detail">{{ shareData.visit_out_time }}</span>
        <span class="iconfont iconshijian-01"></span>
        <span class="leave-time-detail">{{ shareData.visit_long_time }}分</span>
      </div>
    </div>
    <div class="sales-message-container">
      <div class="sales-message-main">
        <img
          v-if="shareData.user_head"
          :src="shareData.user_head[0].value"
          class="user-head-img"
        />
        <img
          v-else
          src="./../../assets/img/default_head.png"
          class="user-head-img"
        />
        <span class="partner_name">{{ shareData.partner_name }}</span>
        <span class="sales_position">{{ shareData.position }}</span>
        <span class="sales_visit_time">{{ shareData.leave_data }}</span>
      </div>
      <div class="leave_notes-main">
        <p class="leave_notes_title">离店备注</p>
        <p class="leave-noter">{{ shareData.leaving_note || "无" }}</p>
      </div>
    </div>
    <ViewTitle
      title="检查项目"
      :neednavTo="false"
      style="margintop: 10px; marginbottom: 1px"
    />
    <div class="check-info-container">
      <visitQuestionCard :check_info="shareData.step_info" />
    </div>

    <div class="question-list" style="margintop: 10px">
      <span class="question-title">存在的问题</span>
      <visitQuestionCard
        :check_info="shareData.check_info"
        :onlyTrueFalse="true"
      />
    </div>

    <div class="comment-container">
      <ViewTitle title="点评留言列表" :neednavTo="false">
        <div class="comment-num-main">
          <span class="iconfont iconpinglun-01"></span>
          <span class="good-num" v-if="shareData.commend">{{
            shareData.commend.comments_num
          }}</span>
        </div>
      </ViewTitle>
      <div class="comment-list-container" v-if="shareData.commend">
        <p
          class="comment-item"
          v-for="item in shareData.commend.comments_tab"
          :key="item.commend_id"
        >
          <span class="comment-from-name">{{ item.from_name }}:</span>
          <span>{{ item.zcomment }}</span>
        </p>
        <div class="comment-read-container">
          <span class="comment-read-num"
            >已读：{{ shareData.commend.read_num }}人</span
          >
          <span class="comment-not-read-num"
            >未读：{{ shareData.commend.no_read_num }}人</span
          >
        </div>
      </div>
    </div>

    <visitGoodCommandList :shareData="shareData" />
    <ViewTitle
      title="图片"
      :neednavTo="false"
      style="margintop: 10px; marginbottom: 1px"
    />
    <visitImgList v-if="shareData.visit_photo_list" :shareData="shareData" />
  </div>
</template>

<script>
import visitImgList from "@/components/visitRecordList/visitImgList"; // 拜访照片列表
import visitGoodCommandList from "@/components/visitRecordList/visitGoodCommandList"; // 拜访点赞评论列表
import visitQuestionCard from "@/components/visitRecordList/visitQuestionCard"; // 标签
import { getQueryObj } from "@/utils";

const placeKa = require("./../../assets/img/placeKa.png");
const placeRetail = require("./../../assets/img/placeRetail.png");
const placeKTV = require("./../../assets/img/placeKTV.png");
const placefood = require("./../../assets/img/placefood.png");

export default {
  components: {
    visitImgList,
    visitGoodCommandList,
    visitQuestionCard,
  },
  created() {
    // 获取url上的参数
    this.getWorkShareData();

    document.title = "工作圈分享";
  },

  data() {
    return {
      shareData: {
        thumbups_tab: [],
        comments_tab: [],
      },
      typeImg: "",
    };
  },

  methods: {
    // 获取分享的参数
    async getWorkShareData() {
      this.$showLoading();
      this.shareData = await this.$store.dispatch(
        "getShareTerminalVisitDetail",
        {
          obj: getQueryObj(),
        }
      );
      switch (this.shareData.terminal_type) {
        case "ZSNM01":
          this.typeImg = placeKa;
          break;
        case "ZSNM02":
          this.typeImg = placeRetail;
          break;
        case "ZSNM03":
          this.typeImg = placeKTV;
          break;
        case "ZSNM04":
          this.typeImg = placefood;
          break;
      }
      this.$hideLoading();
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./../../assets/less/theme.less");
@import url("./index.less");
</style>