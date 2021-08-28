<template>
  <div id="idPrivatePayCountChart" :style="{ height: height, width: width, margin: margin }" />
</template>

<script>
import echarts from "echarts";

export default {
  name: "PrivatePayCountChart",
  props: {
    chartData: {
      type: Array,
      required: true
    },
    colorData: {
      type: Array,
      required: true
    },
    width: {
      type: String,
      default: "360px"
    },
    height: {
      type: String,
      default: "210px"
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
      this.myChart = echarts.init(document.getElementById("idPrivatePayCountChart"));
      this.myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c}({d}%)"
        },
        series: [
          {
            name: "部门支出统计",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["50%", "70%"],
            color: this.colorData,
            clockwise: false,
            avoidLabelOverlap: false,
            label: {
              normal: {
                formatter: "{d}%\n{hr|}\n{b}",
                rich: {
                  hr: {
                    height: 10
                  }
                }
              }
            },
            labelLine: {
              normal: {
                length: 15,
                length2: 30
              }
            },
            data: this.chartData
          }
        ]
      });
    }
  }
};
</script>