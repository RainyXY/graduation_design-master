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
          教练数据中心
        </h4>
        <Row span="2">
          <Button type="primary" @click="addBtn">
            <Icon type="plus"></Icon>
            新增教练信息
          </Button>
          <Button type="primary" @click="searchBtn">
            <Icon type="ios-search"></Icon>
            查询
          </Button>
          <Modal v-model="addModal" width="800px" :closable="closeable" :mask-closable="maskCloseable">
            <p slot="header" style="text-align:center">
              <Icon type="plus"></Icon>
              <span>新增教练信息</span>
            </p>
            <div>
              <Form ref="formValidate" :model="addForm" :rules="ruleValidate" :label-width="80">
                <FormItem label="教练工号" prop="coach_id">
                  <Input v-model="addForm.coach_id" placeholder="教练工号"/>
                </FormItem>
                <FormItem label="姓名" prop="coach_name">
                  <Input v-model="addForm.coach_name" placeholder="教练姓名"/>
                </FormItem>
                <FormItem label="性别" prop="coach_gender">
                  <RadioGroup v-model="addForm.coach_gender">
                    <Radio label="男" >男</Radio>
                    <Radio label="女">女</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="联系方式" prop="coach_phone">
                  <Input v-model="addForm.coach_phone" placeholder="联系方式"/>
                </FormItem>
                <FormItem label="特长" prop="coach_strong">
                  <Input v-model="addForm.coach_strong" placeholder="特长"/>
                </FormItem>
                <FormItem label="工资" prop="coach_income">
                  <Input v-model="addForm.coach_income" placeholder="工资"/>
                </FormItem>
                <!--<FormItem label="班级" prop="tea_class">-->
                  <!--<Input v-model="addForm.tea_class" placeholder="任教班级"></Input>-->
                <!--</FormItem>-->
                <!--<FormItem label="所属学院" prop="tea_college">-->
                  <!--<Input v-model="addForm.tea_college" placeholder="所属分院"></Input>-->
                <!--</FormItem>-->
                <!--<FormItem label="所属专业" prop="tea_major">-->
                  <!--<Input v-model="addForm.tea_major" placeholder="所属专业"></Input>-->
                <!--</FormItem>-->
              </Form>
            </div>
            <div slot="footer">
              <Button type="primary" @click="addTeacher('formValidate')">添加</Button>
              <Button @click="cancelInput">取消</Button>
            </div>
          </Modal>
          <Modal v-model="updateModal" width="600px" :closable="closeable1" :mask-closable="maskCloseable1">
            <p slot="header" style="text-align:center">
              <Icon type="edit"></Icon>
              <span>修改教练信息</span>
            </p>
            <div>
              <Form ref="formValidate1" :model="updateForm" :rules="ruleValidate" :label-width="80">
                <FormItem label="工号" prop="coach_id">
                  <Input disabled v-model="updateForm.coach_id" placeholder="教练工号"></Input>
                </FormItem>
                <FormItem label="姓名" prop="coach_name">
                  <Input disabled v-model="updateForm.coach_name" placeholder="教练姓名"></Input>
                </FormItem>
                <FormItem label="性别" prop="coach_gender">
                  <RadioGroup v-model="updateForm.coach_gender">
                    <Radio label="男">男</Radio>
                    <Radio label="女">女</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="联系方式" prop="coach_phone">
                  <Input v-model="updateForm.coach_phone" placeholder="联系方式"></Input>
                </FormItem>
                <FormItem label="特长" prop="coach_strong">
                  <Input v-model="updateForm.coach_strong" placeholder="特长"/>
                </FormItem>
                <FormItem label="工资" prop="coach_income">
                  <Input v-model="updateForm.coach_income" placeholder="工资"/>
                </FormItem>
              </Form>
            </div>
            <div slot="footer">
              <Button type="primary" @click="updateTeacher('formValidate1')">更新</Button>
              <Button @click="cancelInput">取消</Button>
            </div>
          </Modal>
        </Row>
        <Row class="margin-top-10">
          <Col span="23" class="margin-top-10">
            <Table :size="size" border="border" :columns="excelColumns" :data="table2excelData" size="small" ref="tableExcel"></Table>
            <Page class="margin-top-20" :total="total" :current="currentPage" :page-size="pageSize" @on-change="onchangePage"></Page>
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
  // import Cookies from 'js-cookie';
  export default {
    name: 'teacher_manage',
    data () {
      const validePhone = (rule, value, callback) => {
        const re = /^1[0-9]{10}$/;
        if (!re.test(value)) {
          callback(new Error('请输入正确格式的手机号'));
        } else {
          callback();
        }
      };
      return {
        excelColumns: [
          {
            title: '教练工号',
            key: 'coach_id',
            width:120,
            align:'center'
          },
          {
            title: '姓名',
            key: 'coach_name',
            width:110,
            align:'center'
          },
          {
            title: '性别',
            key: 'coach_gender',
            width:110,
            align:'center'
          },
          {
            title: '联系方式',
            key: 'coach_phone',
            width:180,
            align:'center'
          },
          {
            title: '特长',
            key: 'coach_strong',
            width:180,
            align:'center'
          },
          {
            title: '工资(元)',
            key: 'coach_income',
            width:160,
            align:'center'
          },
          // {
          //   title: '工资',
          //   key: 'coach_income',
          //   width:160,
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
          //             this.showClass(params.index)
          //           }
          //         }
          //       }, '班级信息')
          //     ]);
          //   }
          // },
          // {
          //   title: '级别',
          //   key: '',
          //   width:100
          // },

          // {
          //   title: '操作',
          //   key: 'action',
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
          //             this.updateForm=this.table2excelData[params.index];
          //             this.updateModal=true;
          //           }
          //         }
          //       }, '修改'),
          //       h('Button', [
          //         h('Poptip', {
          //           props: {
          //             type: 'error',
          //             size: 'small',
          //             confirm:true,
          //             placement:'right',
          //             title:'是否删除？',
          //             okText:'删除',
          //             cancelText:'取消'
          //           },
          //           on: {
          //             'on-ok':()=>{
          //               this.deleteTeacher(params.index);
          //             },
          //             'on-cancel':()=>{}
          //           }
          //         }, '删除')
          //       ])
          //     ]);
          //   }
          // }
          {
            title: '操作',
            key: 'action',
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
                      this.delTeacher(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
          // {
          //   title: '',
          //   key: 'user_password',
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
          //             this.show(params.index)
          //           }
          //         }
          //       }, '登录密码')
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
        form:{  //request
          pageSize:20,
          currentPage:1
        },
        addForm:{
          coach_id:'',
          coach_name:'',
          coach_gender:'',
          coach_phone:'',
          coach_strong:'',
          coach_income:''
        },
        updateForm:{},
        ruleValidate: {
          coach_id: [
            { required: true, message: '请输入教练工号', trigger: 'blur' }
          ],
          coach_name: [
            { required: true, message: '请输入教练姓名', trigger: 'blur' }
          ],
          coach_gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          coach_phone: [
            { required: true,validator:validePhone, trigger: 'blur' }
          ],
          coach_strong: [
            { required: true, message: '请输入特长', trigger: 'blur' }
          ],
          coach_income: [
            { required: true, message: '请输入工资', trigger: 'blur' }
          ]
        }
      };
    },
    mounted() {
      this.request();
    },
    methods: {
      request(){
        this.$http.post('http://localhost:9090/auth/coach/list', this.form)
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
        this.request();
      },
      exportExcel () {
        table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.excelFileName);
      },
      show (index) {
        this.$Modal.info({
          title: '详细信息',
          content: `登录密码：  ${this.table2excelData[index].user_password}`
        })
      },
      onchangePage(val){
        this.currentPage=val;
        this.form.currentPage=val;
        this.request();
      },
      //add a teacher information
      addBtn(){
        this.addModal=true;
      },
      addTeacher(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            // this.updateForm.tea_gender=parseInt(this.updateForm.tea_gender);
            this.$http.post('http://localhost:9090/auth/coach/add', this.addForm)
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
        this.updateModal=false;
        this.updateForm={}
        this.addForm={
          coach_id:'',
          coach_name:'',
          coach_gender:'',
          coach_phone:'',
          coach_strong:'',
          coach_income:''
        };
      },
      //show class information
      // showClass(index){
      //   this.$Modal.info({
      //     title: '班级信息',
      //     content: `${this.table2excelData[index].tea_class}`
      //   })
      // },
      //update teacher's information
      updateTeacher(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            // this.updateForm.tea_gender=parseInt(this.addForm.tea_gender);
            this.$http.post('http://localhost:9090/auth/coach/updateInfo', this.updateForm)
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
          }else{}
        })
      },
      //delete a coach
      delTeacher(index){
        if(confirm('确定是否删除？')){
          let delForm={
            coach_id:this.table2excelData[index].coach_id
          }
          this.$http.post('http://localhost:9090/auth/coach/delTeacher', delForm)
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
      }
      // deleteTeacher(index){
      //   let form={
      //     tea_id:this.table2excelData[index].tea_id
      //   }
      //   this.$http.post('http://localhost:9090/auth/coach/delete', form)
      //     .then((res) => {
      //       if (res.data.success) {
      //         this.$Message.success(res.data.info);
      //         this.table2excelData.splice(index,1);
      //       } else {
      //         this.$Message.error(res.data.info);
      //       }
      //     }, (err) => {
      //       this.$message.error('请求错误！');
      //     });
      // }
    }
  };
</script>
<style scoped>

</style>
