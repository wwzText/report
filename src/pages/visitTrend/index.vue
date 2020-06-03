<template>
  <!-- 拜访趋势 -->
  <div></div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      seven_chart: null,
      month_chart: null,
      seven_option: {
        title: {
          // text: '未来一周气温变化',//感觉头部有点乱，没使用自带的标题
          // subtext: '纯属虚构'
          x: "left",
          align: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["最高气温", "最低气温"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            magicType: { type: ["line", "bar"] }, //柱状图和西和折线图切换
            restore: {}, //刷新
            saveAsImage: {} //将图表以折线图的形式展现
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["11-26", "11-27", "11-28", "11-29", "11-30", "12-01", "12-02"]
        },
        yAxis: {
          name: "℃",
          nameLocation: "end",
          type: "value",
          axisLabel: {
            formatter: "{value} "
          }
        },
        series: [
          {
            name: "最低气温",
            type: "line",
            data: [0, -1, -3, -4, 0, -2, -4],
            lineStyle: {
              //设置折线色颜色
              color: "#3f89ec"
            },
            itemStyle: {
              //设置折线折点的颜色
              normal: {
                color: "#3f89ec"
              }
            }
          },
          {
            name: "最高气温",
            type: "line",
            data: [9, 10, 6, 7, 12, 11, 8],
            lineStyle: {
              //设置折线色颜色
              color: "black"
            },
            itemStyle: {
              //设置折线折点的颜色
              normal: {
                color: "black"
              }
            }
          },
          {
            name: "平行于y轴的趋势线",
            type: "line",
            markLine: {
              name: "aa",
              data: [
                {
                  name: "0℃标准线",
                  yAxis: 0,
                  lineStyle: {
                    //设置折线色颜色
                    color: "red"
                  }
                }
              ],
              symbol: ["arrow", "none"], //将箭头向左  默认值是向右的
              label: {
                show: true,
                position: "middle", //markline描述位于中间   right，left，middle
                formatter: "{b}: {c}" //显示name中的描述
              }
            }
          }
        ]
      }
    };
  },
  mounted: function() {
    this.get_echarts();
  },
  methods: {
    get_echarts: function() {
      this.seven_chart = this.echarts.init(document.getElementById("seven"));
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
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>