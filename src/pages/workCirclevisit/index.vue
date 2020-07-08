<template>
  <div class="work-share-container">
    <div class="address-time-container">
      <div class="address-main">
        <img :src="typeImg" alt />
        <span class="terminal_name">{{shareData.terminal_name}}/{{shareData.zzdhzxz_txt}}</span>
      </div>
      <div class="leave-time-container">
        <span class="iconfont iconqiandao-01"></span>
        <span class="leave-time-detail">{{shareData.visit_in_time}} --</span>
        <span class="iconfont iconqiantui-01"></span>
        <span class="leave-time-detail">{{shareData.visit_out_time}}</span>
        <span class="iconfont iconshijian-01"></span>
        <span class="leave-time-detail">{{shareData.visit_long_time}}分</span>
      </div>
    </div>
    <div class="sales-message-container">
      <div class="sales-message-main">
        <img
          :src="shareData.user_head ? shareData.user_head[0].value : './../../assets/img/default_head.png'"
          alt
          class="user-head-img"
        />
        <span class="partner_name">{{shareData.partner_name}}</span>
        <span class="sales_position">{{shareData.position}}</span>
        <span class="sales_visit_time">{{shareData.leave_data}}</span>
      </div>
      <div class="leave_notes-main">
        <p class="leave_notes_title">离店备注</p>
        <p class="leave-noter">{{shareData.leaving_note || '无'}}</p>
      </div>
    </div>
    <ViewTitle title="检查项目" :neednavTo="false" style="marginTop: 10px; marginBottom: 1px" />
    <div class="check-info-container">
      <visitQuestionCard :check_info="shareData.step_info" />
    </div>

    <div class="question-list" style="marginTop: 10px;">
      <span class="question-title">存在的问题</span>
      <visitQuestionCard :check_info="shareData.check_info" :onlyTrueFalse="true" />
    </div>

    <div class="comment-container">
      <ViewTitle title="点评留言列表" :neednavTo="false">
        <div class="comment-num-main">
          <span class="iconfont iconpinglun-01"></span>
          <span class="good-num" v-if="shareData.commend">{{shareData.commend.comments_num}}</span>
        </div>
      </ViewTitle>
      <div class="comment-list-container" v-if="shareData.commend">
        <p
          class="comment-item"
          v-for="item in shareData.commend.comments_tab"
          :key="item.commend_id"
        >
          <span class="comment-from-name">{{item.from_name}}:</span>
          <span>{{item.zcomment}}</span>
        </p>
        <div class="comment-read-container">
          <span class="comment-read-num">已读：{{shareData.commend.read_num}}人</span>
          <span class="comment-not-read-num">未读：{{shareData.commend.no_read_num}}人</span>
        </div>
      </div>
    </div>

    <visitGoodCommandList v-if="shareData.thumbups_tab" :shareData="shareData" />
    <ViewTitle title="图片" :neednavTo="false" style="marginTop: 10px; marginBottom: 1px" />
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
    visitQuestionCard
  },
  created() {
    // 获取url上的参数
    this.getWorkShareData();

    document.title = "工作圈分享";
  },

  data() {
    return {
      shareData: {},
      typeImg: ""
    };
  },

  methods: {
    // 获取分享的参数
    async getWorkShareData() {
      this.$showLoading();
      this.shareData = await this.$store.dispatch(
        "getShareTerminalVisitDetail",
        {
          obj: getQueryObj()
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
    }
  }
};
</script>

<style lang="less" scoped>
.work-share-container {
  background-color: #d9d9d9;
  height: 100%;
  overflow: auto;
}
// 头部地址及进店离店时间
.address-time-container {
  background-color: white;
  padding: 15px 10px;
  box-sizing: border-box;
  .leave-time-container {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .iconqiandao-01,
    .iconqiantui-01,
    .iconshijian-01 {
      color: @primaryColor;
      font-size: 20px;
    }
    .leave-time-detail {
      font-size: 12px;
      color: @fontColor;
    }
    .iconshijian-01 {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  .address-main {
    display: flex;

    .terminal_name {
      font-size: 16px;
      font-weight: 500;
      margin-left: 10px;
    }
  }
}

// 业务员信息-离店备注
.sales-message-container {
  padding: 10px 15px;
  background-color: white;
  box-sizing: border-box;
  margin-top: 1px;
  .sales-message-main {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .user-head-img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 6px;
    }
    .partner_name {
      font-size: 16px;
      margin-right: 10px;
    }
    .sales_position {
      font-size: 12px;
      color: #989898;
      flex: 1;
      margin-right: 10px;
    }
    .sales_visit_time {
      font-size: 12px;
      color: #666;
    }
  }
  .leave_notes-main {
    .leave_notes_title {
      font-size: 12px;
      color: #989898;
    }
    .leave-noter {
      font-size: 14px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}

// 检查项目
.check-info-container {
  padding: 15px 10px;
  box-sizing: border-box;
  background-color: white;
}

// 点评列表
.comment-container {
  margin-top: 10px;
  .comment-num-main {
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    .iconpinglun-01 {
      color: @primaryColor;
      font-size: 20px;
      margin-left: 15px;
      margin-right: 2px;
    }
    .good-num {
      font-size: 14px;
      color: @fontColor;
    }
  }
  .comment-list-container {
    padding: 10px;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    flex-direction: column;
    .comment-item {
      background: #f7f7f7;
      padding: 10px;
      box-sizing: border-box;
      font-size: 14px;
      align-self: stretch;
      .comment-from-name{
        color: #2986E6;
      }
    }
    .comment-read-container{
      align-self: flex-end;
      display: flex;
      align-items: center;
      margin-top: 10px;
      .comment-read-num,
      .comment-not-read-num{
        font-size: 14px;
      }
      .comment-not-read-num{
        color: #2986E6;
        margin-left: 10px;
      }
    }
  }
}

.question-list {
  background: rgba(255, 246, 245, 1);
  padding: 15px 10px;
  box-sizing: border-box;
  .question-title {
    font-size: 16px;
    color: #db2b2b;
    font-weight: bold;
  }
}
</style>