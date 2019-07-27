<style lang="less" scoped>
  @import '../../styles/common.less';
  @import '../tables/components/table.less';
</style>

<template>
  <div>
    <Row class="margin-top-10">
      <Card>
        <h4 slot="title">
          <Icon type="android-archive"></Icon>
          学生课程表查询
        </h4>
        <!-- <Row>
          <Select v-model="term" style="width:300px">
            <Option v-for="item in calendar" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <i-button type="primary" icon="ios-search" @click="search">查询</i-button>
        </Row> -->
        <Row class="margin-top-10">
          <Col span="24">
            <Table :size="size" border="border" :columns="excelColumns" :data="table2excelData" size="small" ref="tableExcel"></Table>
          </Col>
          <!--<Col span='4' class="padding-left-10">-->
            <!--<div class="margin-top-10 margin-left-10">-->
              <!--<span>输入导出的文件名：</span>-->
              <!--<Input v-model="excelFileName" icon="document" placeholder="请输入文件名" style="width: 190px" />-->
            <!--</div>-->
            <!--<div class="margin-left-10 margin-top-20">-->
              <!--<a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>-->
              <!--<Button type="primary" size="large" @click="exportExcel">下载表格数据</Button>-->
            <!--</div>-->
          <!--</Col>-->
        </Row>
      </Card>
    </Row>
  </div>
</template>

<script>
  import table2excel from '@/libs/table2excel.js';
  import Cookies from 'js-cookie';
  export default {
    name: 'timetable',
    data () {
      return {
        excelColumns: [
          {
            title: '周一',
            key: 't_zhouyi'
          },
          {
            title: '周二',
            key: 't_zhouer'
          },
          {
            title: '周三',
            key: 't_zhousan'
          },
          {
            title: '周四',
            key: 't_zhousi'
          },
          {
            title: '周五',
            key: 't_zhouwu'
          },
          {
            title: '周六',
            key: 't_zhouliu'
          },
          {
            title: '周日',
            key: 't_zhouri'
          },
        ],
        table2excelData: [
          // {
          //   t_zhouyi:'阴瑜伽',
          //   t_zhouer:'Popping',
          //   t_zhousan:'JAZZ',
          //   t_zhousi:'哈他瑜伽',
          //   t_zhouwu:'Hip-Hop',
          //   t_zhouliu:'Popping',
          //   t_zhouri:'哈他瑜伽',
          // },
          // {
          //   t_zhouyi:'哈他瑜伽',
          //   t_zhouer:'Popping',
          //   t_zhousan:'JAZZ',
          //   t_zhousi:'哈他瑜伽',
          //   t_zhouwu:'Hip-Hop',
          //   t_zhouliu:'阴瑜伽',
          //   t_zhouri:'Popping',
          // },
          // {
          //   t_zhouyi:'阴瑜伽',
          //   t_zhouer:'Popping',
          //   t_zhousan:'JAZZ',
          //   t_zhousi:'哈他瑜伽',
          //   t_zhouwu:'Hip-Hop',
          //   t_zhouliu:'Popping',
          //   t_zhouri:'哈他瑜伽',
          // },
          // {
          //   t_zhouyi:'阴瑜伽',
          //   t_zhouer:'Popping',
          //   t_zhousan:'JAZZ',
          //   t_zhousi:'哈他瑜伽',
          //   t_zhouwu:'Hip-Hop',
          //   t_zhouliu:'Popping',
          //   t_zhouri:'哈他瑜伽',
          // },
          // {
          //   t_zhouyi:'哈他瑜伽',
          //   t_zhouer:'Popping',
          //   t_zhousan:'JAZZ',
          //   t_zhousi:'哈他瑜伽',
          //   t_zhouwu:'Hip-Hop',
          //   t_zhouliu:'阴瑜伽',
          //   t_zhouri:'Popping',
          // },
          // {
          //   t_zhouyi:'阴瑜伽',
          //   t_zhouer:'Popping',
          //   t_zhousan:'JAZZ',
          //   t_zhousi:'哈他瑜伽',
          //   t_zhouwu:'Hip-Hop',
          //   t_zhouliu:'Popping',
          //   t_zhouri:'哈他瑜伽',
          // },
          // {
          //   t_zhouyi:'阴瑜伽',
          //   t_zhouer:'Popping',
          //   t_zhousan:'JAZZ',
          //   t_zhousi:'哈他瑜伽',
          //   t_zhouwu:'Hip-Hop',
          //   t_zhouliu:'Popping',
          //   t_zhouri:'哈他瑜伽',
          // },
          // {
          //   t_zhouyi:'哈他瑜伽',
          //   t_zhouer:'Popping',
          //   t_zhousan:'JAZZ',
          //   t_zhousi:'哈他瑜伽',
          //   t_zhouwu:'Hip-Hop',
          //   t_zhouliu:'阴瑜伽',
          //   t_zhouri:'Popping',
          // },
          // {
          //   t_zhouyi:'阴瑜伽',
          //   t_zhouer:'Popping',
          //   t_zhousan:'JAZZ',
          //   t_zhousi:'哈他瑜伽',
          //   t_zhouwu:'Hip-Hop',
          //   t_zhouliu:'Popping',
          //   t_zhouri:'哈他瑜伽',
          // },
        ],
        border:true,
        size:'large',
        excelFileName: '',
        tableExcel: {},
        fontSize: 16,
        term:'',
        calendar: [
          {
            value: '1',
            label: '1月'
          },
          {
            value: '2',
            label: '2月'
          },
          {
            value: '3',
            label: '3月'
          },
          {
            value: '4',
            label: '4月'
          },
          {
            value: '5',
            label: '5月'
          },
          {
            value: '6',
            label: '6月'
          },
          {
            value: '7',
            label: '7月'
          },
          {
            value: '8',
            label: '8月'
          },
          {
            value: '9',
            label: '9月'
          },
          {
            value: '10',
            label: '10月'
          },
          {
            value: '11',
            label: '11月'
          },
          {
            value: '12',
            label: '12月'
          }
        ],
        timeForm:{
          id:'',
          term:''
        }
      };
    },
    mounted() {
      this.timeForm.id=Cookies.get('user');
      this.search();
    },
    methods: {
      exportExcel () {
        table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.excelFileName);
      },
      search(){
        this.timeForm.term=this.term;
        this.$http.post('http://localhost:9090/auth/timetable', this.timeForm)
          .then((res) => {
            if (res.data.success) {
              if(res.data.list.length){
                this.table2excelData=res.data.list;
              } else{
                this.$Message.error('暂无课程表信息');
              }
            } else {
              this.$Message.error(res.data.info);
            }
          }, (err) => {
            this.$message.error('请求错误！');
          });
      }
    }
  };
</script>
<style scoped>

</style>
