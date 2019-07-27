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
          健身房课程管理
        </h4>
        <Row span="1">
          <Col span="8">
            <Cascader :data="collegeAndMajor" trigger="hover" class="margin-right-10" @on-change="select" :value="v1"></Cascader>
          </Col>
          <Col span="16">
            <Button type="primary" @click="searchBtn">
              <Icon type="ios-search"></Icon>
              查询
            </Button>
            <Button type="primary" @click="addBtn">
              <Icon type="plus"></Icon>
              新增课程信息
            </Button>
          </Col>
          <Modal v-model="addModal" width="600px" :closable="closeable" :mask-closable="maskCloseable">
            <p slot="header" style="text-align:center">
              <Icon type="plus"></Icon>
              <span>新增课程信息</span>
            </p>
            <div>
              <Form ref="formValidate" :model="addForm" :rules="ruleValidate" :label-width="80">
                <FormItem label="课程编号" prop="cor_id">
                  <Input v-model="addForm.cor_id" placeholder="课程编号"/>
                </FormItem>
                <FormItem label="课程名称" prop="cor_name">
                  <Input v-model="addForm.cor_name" placeholder="课程名称"/>
                </FormItem>
                <FormItem label="课程种类" prop="cor_">
                  <Cascader :data="collegeAndMajor" trigger="hover" @on-change="select1"></Cascader>
                </FormItem>
                <FormItem label="课程周期" prop="cor_weekdays">
                  <Input v-model="addForm.cor_weekdays" placeholder="课程周期"/>
                </FormItem>
                <FormItem label="课时" prop="cor_hour">
                  <Input v-model="addForm.cor_hour" placeholder="课时"/>
                </FormItem>
                <FormItem label="课程开始时间" prop="cor_start">
                  <Input v-model="addForm.cor_start" placeholder="课程开始时间"/>
                </FormItem>
                <!--<FormItem label="年级" prop="cor_grade">-->
                  <!--<InputNumber v-model="addForm.cor_grade" :editable="editable" :min="min" :max="max"></InputNumber>-->
                <!--</FormItem>-->
              </Form>
            </div>
            <div slot="footer">
              <Button type="primary" @click="addCourse('formValidate')">添加</Button>
              <Button @click="cancelInput">取消</Button>
            </div>
          </Modal>
        </Row>
        <Row class="margin-top-10">
          <Col span="23" class="margin-top-10">
            <Table :size="size" border="border" :columns="excelColumns" :data="table2excelData" size="small" ref="tableExcel"></Table>
            <Page class="margin-top-20" :total="total" :current="currentPage" :page-size="pageSize" @on-change="onchangePage"></Page>
          </Col>
        </Row>
      </Card>
    </Row>
  </div>
</template>

<script>
  import table2excel from '@/libs/table2excel.js';
  // import Cookies from 'js-cookie';
  export default {
    name: 'teacher_manage',
    data () {
      return {
        excelColumns: [
          {
            title: '课程编号',
            key: 'cor_id',
            width:100,
            align:'center'
          },
          {
            title: '课程名称',
            key: 'cor_name',
            width:160,
            align:'center'
          },
          {
            title: '课程种类',
            key: 'cor_major',
            width:150,
            align:'center'
          },
          {
            title: '课程周期',
            key: 'cor_weekdays',
            width:180,
            align:'center'
          },
          {
            title: '课时(min)',
            key: 'cor_hour',
            width:100,
            align:'center'
          },
          {
            title: '课程开始时间',
            key: 'cor_start',
            width:200,
            align:'center'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.delete(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
          // {
          //   title: '操作',
          //   key: 'action',
          //   align: 'center',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', [
          //         h('Poptip', {
          //           props: {
          //             confirm:true,
          //             title:'是否删除？',
          //             placement:'right',
          //             okText:'删除',
          //             cancelText:'取消'
          //           },
          //           on: {
          //             'on-ok':()=>{
          //               this.delete(params.index);
          //             },
          //             'on-cancel':()=>{}
          //           }
          //         }, '删除')
          //       ])
          //     ]);
          //   }
          // }
        ],
        table2excelData: [],
        border:true,
        size:'large',
        excelFileName: '',
        tableExcel: {},
        fontSize: 16,
        total:0,
        pageSize:20,
        currentPage:1,
        addModal:false,
        updateModal:false,
        closeable:false,
        closeable1:false,
        maskCloseable:false,
        maskCloseable1:false,
        editable:false,
        max:4,
        min:1,
        v1:[],
        v2:[],
        search:{
          // college:'',
          major:''
        },
        form:{  //request
          // cor_college:'',
          cor_major:'',
          pageSize:20,
          currentPage:1
        },
        addForm:{
          cor_id:'',
          cor_name:'',
          cor_major:'',
          cor_weekdays:'',
          cor_hour:'',
          cor_start:''
        },
        collegeAndMajor:[
          {
          value: '街舞',
          label: '街舞',
          children: [
            {
              value: 'JAZZ',
              label: 'JAZZ'
            },
            {
              value: 'Popping',
              label: 'Popping'
            },
            {
              value: 'Hip-Hop',
              label: 'Hip-Hop'
            }
          ]
        },
          {
          value: '瑜伽',
          label: '瑜伽',
          children: [
            {
              value: '哈他瑜伽',
              label: '哈他瑜伽'
            },
            {
              value: '阴瑜伽',
              label: '阴瑜伽'
            },
            {
              value: '理疗瑜伽',
              label: '理疗瑜伽'
            }
          ]
        }],
        ruleValidate: {
          cor_id: [
            { required: true, message: '请输入课程编号', trigger: 'blur' }
          ],
          cor_name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' }
          ],
          cor_major: [
            { required: true, message: '请输入课程种类', trigger: 'change' }
          ],
          cor_weekdays: [
            { required: true, message: '请输入课程周期', trigger: 'blur' }
          ],
          cor_hour: [
            { required: true, message: '请选择课时', trigger: 'blur' }
          ],
          cor_start: [
            { required: true, message: '请选择课程开始时间', trigger: 'blur' }
          ]
        }
      };
    },
    mounted() {
      this.request();
    },
    methods: {
      request(){
        this.$http.post('http://localhost:9090/auth/course/search', this.form)
          .then((res) => {
            if (res.data.success) {
              this.table2excelData=res.data.list;
              this.total=res.data.total;
            } else {
              this.$Message.error(res.data.info);
            }
          }, (err) => {
            this.$message.error('请求错误！');
          });
      },
      //search
      searchBtn(){
        // this.form.cor_college=this.search.college;
        this.form.cor_major=this.search.major;
        this.request();
      },
      exportExcel () {
        table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.excelFileName);
      },
      onchangePage(val){
        this.currentPage=val;
        this.form.currentPage=val;
        // this.form.cor_college=this.search.college;
        this.form.cor_major=this.search.major;
        this.request();
      },
      //add a teacher information
      addBtn(){
        this.addModal=true;
      },
      add(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            // this.updateForm.tea_gender=parseInt(this.updateForm.tea_gender);

            this.$http.post('http://localhost:9090/auth/course/add', this.addForm)
              .then((res) => {
                if (res.data.success) {
                  this.$Message.success(res.data.info);
                  this.cancelInput();
                } else {
                  this.$Message.error(res.data.info);
                }
              }, (err) => {
                this.$message.error('请求错误！');
              });
          }
        })
      },
      cancelInput(){
        this.addModal=false;
        this.addForm={
          cor_id:'',
          cor_name:'',
          cor_major:'',
          cor_weekdays:'',
          cor_hour:'',
          cor_start:''
        };
        this.v2=[];
      },
      select(q,w){
        if(w.length){
          // this.search.college=w[0].value;
          this.search.major=w[1].value;
        }else{
          // this.search.college='';
          this.search.major='';
        }
      },
      select1(q,w){
        if(w.length){
          // this.addForm.cor_college=w[0].value;
          this.addForm.cor_major=w[1].value;
        }
      },
      //delete
      delete(index){
        let form={
          cor_id:this.table2excelData[index].cor_id
        }
        this.$http.post('http://localhost:9090/auth/course/del', form)
          .then((res) => {
            if (res.data.success) {
              this.$Message.success(res.data.info);
              this.table2excelData.splice(index,1);
            } else {
              this.$Message.error(res.data.info);
            }
          }, (err) => {
            this.$message.error('请求错误！');
          });
      },
      addCourse(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('http://localhost:9090/auth/course/add', this.addForm)
              .then((res) => {
                if (res.data.success) {
                  this.$Message.success(res.data.info);
                  this.cancelInput();
                } else {
                  this.$Message.error(res.data.info);
                }
              }, (err) => {
                this.$message.error('请求错误！');
              });
          }
        })
      }
    }
  };
</script>
<style scoped>

</style>
