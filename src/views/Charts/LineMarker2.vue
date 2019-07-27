<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '200px'
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id))

        this.chart.setOption({
          backgroundColor: '#394056',
          title: {
            top: 20,
            text: 'Requests',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 16,
              color: '#F1F1F3'
            },
            left: '1%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#57617B'
              }
            }
          },
          legend: {
            top: 20,
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: 'expense',
            right: '4%',
            textStyle: {
              fontSize: 12,
              color: '#F1F1F3'
            }
          },
          grid: {
            top: 100,
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }],
          yAxis: [{
            type: 'value',
            name: '(元)',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14
              }
            },
            splitLine: {
              lineStyle: {
                color: '#57617B'
              }
            }
          }],
          series: [
            //   {
            //   name: 'CMCC',
            //   type: 'line',
            //   smooth: true,
            //   symbol: 'circle',
            //   symbolSize: 5,
            //   showSymbol: false,
            //   lineStyle: {
            //     normal: {
            //       width: 1
            //     }
            //   },
            //   areaStyle: {
            //     normal: {
            //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //         offset: 0,
            //         color: 'rgba(137, 189, 27, 0.3)'
            //       }, {
            //         offset: 0.8,
            //         color: 'rgba(137, 189, 27, 0)'
            //       }], false),
            //       shadowColor: 'rgba(0, 0, 0, 0.1)',
            //       shadowBlur: 10
            //     }
            //   },
            //   itemStyle: {
            //     normal: {
            //       color: 'rgb(137,189,27)',
            //       borderColor: 'rgba(137,189,2,0.27)',
            //       borderWidth: 12
            //
            //     }
            //   },
            //   data: [2200, 1820, 1910, 1340, 1500, 1200, 1100, 1250, 1450, 1220, 1650, 1220]
            // },
            {
              name: 'expense',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(219, 50, 51, 0.3)'
                  }, {
                    offset: 0.8,
                    color: 'rgba(219, 50, 51, 0)'
                  }], false),
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowBlur: 10
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(219,50,51)',
                  borderColor: 'rgba(219,50,51,0.2)',
                  borderWidth: 12

                }
              },
              data: [1520, 1110, 1125, 1145, 1122, 1165, 1122, 1220, 1182, 1191, 1134, 1150]
            }
            // {
            //   name: 'CUCC',
            //   type: 'line',
            //   smooth: true,
            //   symbol: 'circle',
            //   symbolSize: 5,
            //   showSymbol: false,
            //   lineStyle: {
            //     normal: {
            //       width: 1
            //     }
            //   },
            //   areaStyle: {
            //     normal: {
            //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //         offset: 0,
            //         color: 'rgba(0, 136, 212, 0.3)'
            //       }, {
            //         offset: 0.8,
            //         color: 'rgba(0, 136, 212, 0)'
            //       }], false),
            //       shadowColor: 'rgba(0, 0, 0, 0.1)',
            //       shadowBlur: 10
            //     }
            //   },
            //   itemStyle: {
            //     normal: {
            //       color: 'rgb(0,136,212)',
            //       borderColor: 'rgba(0,136,212,0.2)',
            //       borderWidth: 12
            //     }
            //   },
            //   data: [4200, 4820, 5250, 5450, 5220, 5191, 5134, 5150, 4820, 5110, 5165, 5122]
            // }
            ]
        })
      }
    }
  }
</script>
