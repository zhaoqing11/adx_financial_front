<template>
  <div id="idPublicCollectionChart" :style="{ height: height, width: width, margin: margin }" />
</template>

<script>
import echarts from "echarts";

export default {
  name: "PublicCollectionChart",
  props: {
    chartData: {
      type: Array,
      default: {}
    },
    width: {
      type: String,
      default: "370px"
    },
    height: {
      type: String,
      default: "220px"
    },
    margin: {
      type: String,
      default: "0 auto"
    }
  },
  data() {
    return {
      myChart: ""
    };
  },
  watch: {
    chartData: {
      handler(newValue, oldValue) {
        this.chartData = newValue; 
        this.initChart(); 
      },
      deep: true
    }
  },
  mounted() {
    this.initChart();
  },

  methods: {
    initChart() {
      const data = this.chartData
      let xAxisName = '月份'
      let xAxisValue = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]       
      let seriesArray = []
      data.forEach(item => {
        let values = {
          type: "bar",
          name: item.name,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(127,167,255,0.3)"
                },
                {
                  offset: 1,
                  color: "rgba(127,167,255,0.9)"
                }
              ])
            }
          },
          data: item.array
        }
        seriesArray.push(values)
      });

      this.myChart = echarts.init(document.getElementById("idPublicCollectionChart"));
      this.myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "10%",
          right: "8%",
          top: "20%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: ["3%", "3%"],
            name: xAxisName,
            nameTextStyle: {
              color: "#65C6E7"
            },
            axisLabel: {
              color: "#65C6E7"
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(238,238,238,0.2)"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: xAxisValue
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "金额",
            nameTextStyle: {
              color: "#65C6E7"
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#65C6E7"
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(238,238,238,0.2)"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: seriesArray
      });
    }
  }
};
</script>
