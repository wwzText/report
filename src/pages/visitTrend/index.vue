<template>
  <!-- 拜访趋势 -->
  <div id="seven"></div>
</template>

<script type="text/javascript">
import echarts from "echarts";
import { mapState } from "vuex";
export default {
  data() {
    return {
      seven_chart: null,
      month_chart: null,
      seven_option: {
        title: {
          x: "left",
          align: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["拜访家数", "拜访次数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          nameLocation: "end",
          type: "value",
          axisLabel: {
            formatter: "{value} "
          }
        },
        series: [
          {
            name: "拜访次数",
            type: "line",
            data: [],
            lineStyle: {
              //设置折线色颜色
              color: "#3780D9"
            },
            itemStyle: {
              //设置折线折点的颜色
              normal: {
                color: "#3780D9"
              }
            }
          },
          {
            name: "拜访家数",
            type: "line",
            data: [],
            lineStyle: {
              //设置折线色颜色
              color: "#F99C34"
            },
            itemStyle: {
              //设置折线折点的颜色
              normal: {
                color: "#F99C34"
              }
            }
          }
        ]
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.get_echarts();
    });
  },
  methods: {
    get_echarts: function() {
      this.reportMessage.et_trend.map(item => {
        // item.date = item.date.split("-");
        this.seven_option.xAxis.data.push(item.date[2]);
        this.seven_option.series[0].data.push(item.visit_time);
        this.seven_option.series[1].data.push(item.visit_num);
      });

      this.seven_chart = echarts.init(document.getElementById("seven"));
      // 把配置和数据放这里
      this.seven_chart.setOption(this.seven_option);
    }
  },
  beforeDestroy() {
    if (!this.seven_chart) {
      return;
    }
    this.seven_chart.dispose();
    this.seven_chart = null;
  },
  computed: {
    ...mapState({
      reportMessage: state => state.terminalVisitReportStore.reportMessage
    })
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>