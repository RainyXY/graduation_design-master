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
          会员信息管理
        </h4>
        <Row span="1">
          <Button type="primary" @click="addBtn">
            <Icon type="plus"></Icon>
            新增会员信息
          </Button>
          <Button type="primary" @click="searchBtn">
            <Icon type="ios-search"></Icon>
            查询
          </Button>
          <Modal v-model="addModal" width="800px" :closable="closeable" :mask-closable="maskCloseable">
            <p slot="header" style="text-align:center">
              <Icon type="plus"></Icon>
              <span>新增会员信息</span>
            </p>
            <div>
              <Form ref="formValidate" :model="addForm" :rules="ruleValidate" :label-width="80">
                <FormItem label="会员号" prop="stu_id">
                  <Input v-model="addForm.stu_id" placeholder="会员号"/>
                </FormItem>
                <FormItem label="姓名" prop="stu_name">
                  <Input v-model="addForm.stu_name" placeholder="会员姓名"/>
                </FormItem>
                <FormItem label="性别" prop="stu_gender">
                  <RadioGroup v-model="addForm.stu_gender">
                    <Radio label="男" >男</Radio>
                    <Radio label="女">女</Radio>
                  </RadioGroup>
                </FormItem>
                <!--<FormItem label="出生日期" prop="birth">-->
                  <!--<DatePicker v-model="this.birth" format="yyyy-MM-dd" :type="date" placeholder="选择出生日期" style="width: 300px" @on-change="getBirth"></DatePicker>-->
                <!--</FormItem>-->
                <FormItem label="年龄" prop="stu_age">
                  <Input v-model="addForm.stu_age" placeholder="年龄"/>
                </FormItem>
                <FormItem label="身高" prop="stu_height">
                  <Input v-model="addForm.stu_height" placeholder="身高"/>
                </FormItem>
                <FormItem label="体重" prop="stu_weight">
                  <Input v-model="addForm.stu_weight" placeholder="体重"/>
                </FormItem>
                <FormItem label="联系方式" prop="stu_tel">
                  <Input v-model="addForm.stu_tel" placeholder="联系方式"/>
                </FormItem>
                <!--<FormItem label="已选课程" prop="stu_">-->
                  <!--<Cascader :data="collegeAndMajor" trigger="hover" @on-change="select1"></Cascader>-->
                <!--</FormItem>-->
                <FormItem label="已选课程" prop="stu_major">
                  <Input v-model="addForm.stu_major" placeholder="已选课程"/>
                </FormItem>
                <FormItem label="支出" prop="stu_pay">
                  <Input v-model="addForm.stu_pay" placeholder="支出"/>
                </FormItem>
              </Form>
            </div>
            <div slot="footer">
              <Button type="primary" @click="addStudent('formValidate')">添加</Button>
              <Button @click="cancelInput('formValidate')">取消</Button>
            </div>
          </Modal>
          <Modal v-model="updateModal" width="600px" :closable="closeable1" :mask-closable="maskCloseable1">
            <p slot="header" style="text-align:center">
              <Icon type="edit"></Icon>
              <span>修改会员信息</span>
            </p>
            <div>
              <Form ref="formValidate1" :model="updateForm" :rules="ruleValidate" :label-width="80">
                <FormItem label="会员号" prop="stu_id">
                  <Input disabled v-model="updateForm.stu_id" placeholder="会员号"/>
                </FormItem>
                <FormItem  label="姓名" prop="stu_name">
                  <Input disabled v-model="updateForm.stu_name" placeholder="会员姓名"/>
                </FormItem>
                <FormItem label="性别" prop="stu_gender">
                  <RadioGroup v-model="updateForm.stu_gender">
                    <Radio label="男" >男</Radio>
                    <Radio label="女">女</Radio>
                  </RadioGroup>
                </FormItem>
                <!--<FormItem label="出生日期" prop="birth">-->
                <!--<DatePicker v-model="this.birth" format="yyyy-MM-dd" :type="date" placeholder="选择出生日期" style="width: 300px" @on-change="getBirth"></DatePicker>-->
                <!--</FormItem>-->
                <FormItem label="年龄" prop="stu_age">
                  <Input v-model="updateForm.stu_age" placeholder="年龄"/>
                </FormItem>
                <FormItem label="身高" prop="stu_height">
                  <Input v-model="updateForm.stu_height" placeholder="身高"/>
                </FormItem>
                <FormItem label="体重" prop="stu_weight">
                  <Input v-model="updateForm.stu_weight" placeholder="体重"/>
                </FormItem>
                <FormItem label="联系方式" prop="stu_tel">
                  <Input v-model="updateForm.stu_tel" placeholder="联系方式"/>
                </FormItem>
                <!--<FormItem label="已选课程" prop="stu_">-->
                  <!--<Cascader :data="collegeAndMajor" trigger="hover" @on-change="select1"></Cascader>-->
                <!--</FormItem>-->
                <FormItem label="已选课程" prop="stu_major">
                  <Input v-model="updateForm.stu_major" placeholder="已选课程"/>
                </FormItem>
                <FormItem label="支出" prop="stu_pay">
                  <Input v-model="updateForm.stu_pay" placeholder="支出"/>
                </FormItem>
              </Form>
            </div>
            <div slot="footer">
              <Button type="primary" @click="updateStudent('formValidate1')">更新</Button>
              <Button @click="cancelInput">取消</Button>
            </div>
          </Modal>
        </Row>
        <Row class="margin-top-20">
          <Col span="24">
            <Table :size="size" border="border" :columns="excelColumns" :data="table2excelData" size="small" ref="tableExcel"></Table>
            <Page class="margin-top-20" :total="total" :current="currentPage" :page-size="pageSize" @on-change="onchangePage"></Page>
          </Col>
          <!-- <Col span='4' class="padding-left-10">-->
            <!--<div class="margin-top-10 margin-left-10">-->
              <!--<span>输入导出的文件名：</span>-->
              <!--<Input v-model="excelFileName" icon="document" placeholder="请输入文件名" style="width: 190px" />-->
            <!--</div>-->
            <!--<div class="margin-left-10 margin-top-20">-->
              <!--<a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>-->
              <!--<Button type="primary" size="large" @click="exportExcel">下载表格数据</Button>-->
            <!--</div>-->
          <!--</Col> -->
        </Row>
      </Card>
    </Row>
  </div>
</template>

<script>
  import table2excel from '@/libs/table2excel.js';
  // import Cookies from 'js-cookie';
  export default {
    name: 'student_manage',
    data () {
      const validePhone = (rule, value, callback) => {
        var re = /^1[0-9]{10}$/;
        if (!re.test(value)) {
          callback(new Error('请输入正确格式的手机号'));
        } else {
          callback();
        }
      };
      return {
        excelColumns: [
          {
            title: '会员号',
            key: 'stu_id',
            width:110,
            align:'center'
          },
          {
            title: '姓名',
            key: 'stu_name',
            width:110,
            align:'center'
          },
          {
            title: '性别',
            key: 'stu_gender',
            width:100,
            align:'center'
          },
          {
            title: '年龄',
            key: 'stu_age',
            width:100,
            align:'center'
          },
          {
            title: '身高(cm)',
            key: 'stu_height',
            width:110,
            align:'center'
          },
          {
            title: '体重(kg)',
            key: 'stu_weight',
            width:120,
            align:'center'
          },
          // {
          //   title: '班级',
          //   key: 'stu_class',
          //   width:100,
          //   align:'center'
          // },
          // {
          //   title: '出生日期',
          //   key: 'stu_birth',
          //   width:100
          // },
          {
            title: '联系方式',
            key: 'stu_tel',
            width:160,
            align:'center'
          },
          {
            title: '已选课程',
            key: 'stu_major',
            width:160,
            align:'center'
          },
          {
            title: '支出(元)',
            key: 'stu_pay',
            width:160,
            align:'center'
          },

          // {
          //   title: '家庭住址',
          //   key: 'action1',
          //   width:150,
          //   align: 'center',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {
          //         props: {
          //           type: 'primary',
          //           size: 'small'
          //         },
          //         style: {
          //           marginRight: '5px'
          //         },
          //         on: {
          //           click: () => {
          //             this.showAddress(params.index)
          //           }
          //         }
          //       }, '详细信息')
          //     ]);
          //   }
          // },
          {
            title: '操作',
            key: 'action',
            width:150,
            fixed:'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      console.log(this.table2excelData[params.index]);
                      this.updateForm=this.table2excelData[params.index];
                      this.updateModal=true;

                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.delStudent(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
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
        date:'date',
        birth:'',
        editable:false,
        max:4,
        min:1,
        updateForm:{},
        form:{  //request
          pageSize:20,
          currentPage:1
        },
        addForm:{
          stu_id:'',
          stu_name:'',
          stu_gender:'',
          stu_age:'',
          stu_height:'',
          stu_weight:'',
          stu_tel:'',
          stu_major:'',
          stu_pay:''
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
          stu_id: [
            { required: true, message: '请输入会员号', trigger: 'blur' }
          ],
          stu_name: [
            { required: true, message: '请输入会员姓名', trigger: 'blur' }
          ],
          stu_gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          // stu_age: [
          //   { required: false, type: 'number',message: '请输入年龄', trigger: 'blur' }
          // ],
          stu_height: [
            { required: true, message: '请选择身高', trigger: 'blur' }
          ],
          stu_weight: [
            { required: true, message: '请输入体重', trigger: 'blur' }
          ],
          stu_tel: [
            { validator:validePhone,required: true, trigger: 'blur' }
          ],
          stu_major: [
            { required: true, message: '请输入已选课程', trigger: 'click' }
          ],
          stu_pay: [
            { required: true, message: '请输入支出', trigger: 'blur' }
          ]
          // birth: [
          //   { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
          // ],
        }
      };
    },
    mounted() {
      this.request();
    },
    methods: {
      request(){
        this.$http.post('http://localhost:9090/auth/student/list', this.form)
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
      exportExcel () {
        table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.excelFileName);
      },
      // showAddress(index) {
      //   this.$Modal.info({
      //     title: '家庭住址',
      //     content: `${this.table2excelData[index].stu_address}`
      //   })
      // },
      onchangePage(val){
        this.currentPage=val;
        this.form.currentPage=val;
        this.request();
      },
      //delete a student
      delStudent(index){
        if(confirm('确定是否删除？')){
          let delForm={
            stu_id:this.table2excelData[index].stu_id
          }
          this.$http.post('http://localhost:9090/auth/student/delStudent', delForm)
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
        }
      },
      //add a student information
      addBtn(){
        this.addModal=true;
      },
      addStudent(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('http://localhost:9090/auth/student/add', this.addForm)
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
          }else{

          }
        })
      },
      cancelInput(name){
        this.addModal=false;
        this.updateModal=false;
        this.updateForm={};
        this.addForm={
          stu_id:'',
          stu_name:'',
          stu_gender:'',
          stu_age:'',
          stu_height:'',
          stu_weight:'',
          stu_tel:'',
          stu_major:'',
          stu_pay:''
        };
        // this.birth='';
        // this.$refs[name].resetFields();
      },
      //search
      searchBtn(){
        this.request();
      },
      // change birth
      // getBirth(t,p){
      //   this.addForm.stu_birth=t;
      //   console.log(this.addForm.stu_birth)
      // },
      // update student's information
      updateStudent(name){
        this.$refs[name].validate((valid) => {
          console.log(this.updateForm)
          if (valid) {
            this.$http.post('http://localhost:9090/auth/student/updateInfo', this.updateForm)
              .then((res) => {
                console.log(res.data.info);
                if (res.data.success) {
                  this.$Message.success(res.data.info);
                  this.cancelInput();
                } else {
                  this.$Message.error(res.data.info);
                }
              }, (err) => {
                this.$message.error('请求错误！');
              });
          }else{}
        })
      },
    }
  };
</script>
<style scoped>

</style>
