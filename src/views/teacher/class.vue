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
          带班会员信息
        </h4>
        <Row class="margin-top-10">
          <Col span="21" class="">
            <Table :size="size" border="border" :columns="excelColumns" :data="table2excelData" size="small" ref="tableExcel1"></Table>
            <Page class="margin-top-20" :total="total1" :current="currentPage1" :page-size="pageSize" @on-change="onchangePage1"></Page>
          </Col>
        </Row>
      </Card>
    </Row>
  </div>
</template>

<script>
  import table2excel from '@/libs/table2excel.js';
  import Cookies from 'js-cookie';
  export default {
    name: 'class',
    data () {
      return {
        excelColumns: [
          {
            title: '会员号',
            key: 'stu_id',
            width:130,
            align:'center'
          },
          {
            title: '姓名',
            key: 'stu_name',
            width:120,
            align:'center'
          },
          {
            title: '性别',
            key: 'stu_gender',
            width:110,
            align:'center'
          },
          {
            title: '年龄',
            key: 'stu_age',
            width:110,
            align:'center'
          },
          {
            title: '身高(cm)',
            key: 'stu_height',
            width:120,
            align:'center'
          },
          {
            title: '体重(kg)',
            key: 'stu_weight',
            width:120,
            align:'center'
          },
          {
            title: '联系方式',
            key: 'stu_tel',
            width:160,
            align:'center'
          },
          {
            title: '已选课程',
            key: 'stu_major',
            width:170,
            align:'center'
          }
        ],
        // excelColumns1:[
        //   {
        //     title: '班级',
        //     key: 'cls_name',
        //   },
        //   {
        //     title: '分院',
        //     key: 'cls_college',
        //   },
        //   {
        //     title: '专业',
        //     key: 'cls_major',
        //   },
        //   {
        //     title: '操作',
        //     key: 'action1',
        //     align: 'center',
        //     render: (h, params) => {
        //       return h('div', [
        //         h('Button', {
        //           props: {
        //             type: 'primary',
        //             size: 'small'
        //           },
        //           style: {
        //             marginRight: '5px'
        //           },
        //           on: {
        //             click: () => {
        //               this.search(params.index);
        //             }
        //           }
        //         }, '查询')
        //       ]);
        //     }
        //   },
        // ],
        tableexcelData: [],
        table2excelData: [
          {
            stu_id:'2019',
            stu_name:'aaa',
            stu_gender:'男',
            stu_age:'23',
            stu_height:'175',
            stu_weight:'62',
            stu_tel:'18042682185',
            stu_major:'拳击'
          },
          {
            stu_id:'2018',
            stu_name:'bbb',
            stu_gender:'女',
            stu_age:'27',
            stu_height:'164',
            stu_weight:'49',
            stu_tel:'18042682185',
            stu_major:'JAZZ'
          },
          {
            stu_id:'2019',
            stu_name:'aaa',
            stu_gender:'男',
            stu_age:'23',
            stu_height:'175',
            stu_weight:'62',
            stu_tel:'18042682185',
            stu_major:'拳击'
          },
          {
            stu_id:'2018',
            stu_name:'bbb',
            stu_gender:'女',
            stu_age:'27',
            stu_height:'164',
            stu_weight:'49',
            stu_tel:'18042682185',
            stu_major:'JAZZ'
          },
          {
            stu_id:'2019',
            stu_name:'aaa',
            stu_gender:'男',
            stu_age:'23',
            stu_height:'175',
            stu_weight:'62',
            stu_tel:'18042682185',
            stu_major:'拳击'
          },
          {
            stu_id:'2018',
            stu_name:'bbb',
            stu_gender:'女',
            stu_age:'27',
            stu_height:'164',
            stu_weight:'49',
            stu_tel:'18042682185',
            stu_major:'JAZZ'
          },
          {
            stu_id:'2019',
            stu_name:'aaa',
            stu_gender:'男',
            stu_age:'23',
            stu_height:'175',
            stu_weight:'62',
            stu_tel:'18042682185',
            stu_major:'拳击'
          },
          {
            stu_id:'2018',
            stu_name:'bbb',
            stu_gender:'女',
            stu_age:'27',
            stu_height:'164',
            stu_weight:'49',
            stu_tel:'18042682185',
            stu_major:'JAZZ'
          },
        ],
        border:true,
        size:'large',
        excelFileName: '',
        tableExcel: {},
        fontSize: 16,
        // total:0,
        total1:0,
        pageSize:20,
        currentPage:1,
        currentPage1:1,
        addModal:false,
        updateModal:false,
        closeable:false,
        closeable1:false,
        maskCloseable:false,
        maskCloseable1:false,
        form:{  //request
          pageSize:20,
          currentPage:1,
        },
        form1:{  //request
          pageSize:20,
          currentPage:1,
          stu_class:''
        },
        teaForm:{
          coach_id:'',
          pageSize:20,
          currentPage:1
        },
      };
    },
    mounted() {

      this.request();
    },
    methods: {
      request(){
        this.teaForm.coach_id=Cookies.get('user');
        this.$http.post('http://localhost:9090/auth/class', this.teaForm)
          .then((res) => {
            if (res.data.success) {
              this.tableexcelData=res.data.list;
              this.total=res.data.total;
            } else {
              this.$Message.error(res.data.info);
            }
          }, (err) => {
            this.$message.error('请求错误！');
          });
      },
      //search
      // searchBtn(){
      //   this.request();
      // },
      exportExcel () {
        table2excel.transform(this.$refs.tableExcel1, 'hrefToExportTable', this.excelFileName);
      },
      // onchangePage(val){
      //   this.currentPage=val;
      //   this.form.currentPage=val;
      //   this.request();
      // },
      onchangePage1(val){
        this.currentPage1=val;
        this.form1.currentPage=val;
        this.request1();
      },
      request1(){
        this.$http.post('http://localhost:9090/auth/student/getStudentsByCls', this.form1)
          .then((res) => {
            if (res.data.success) {
              this.table2excelData=res.data.list;
              this.total1=res.data.total;
            } else {
              this.$Message.error(res.data.info);
            }
          }, (err) => {
            this.$message.error('请求错误！');
          });
      },
      // search(index){
      //   this.form1.stu_class=this.tableexcelData[index].cls_name;
      //   this.request1();
      // }
    }
  };
</script>
<style scoped>

</style>
