<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
      <Row>
        <Col span="16">
          <Carousel
            v-model="value3"
            :autoplay="setting.autoplay"
            :autoplay-speed="setting.autoplaySpeed"
            :dots="setting.dots"
            :radius-dot="setting.radiusDot"
            :trigger="setting.trigger"
            :arrow="setting.arrow">
            <CarouselItem>
              <div class="carousel cal1"></div>
            </CarouselItem>
            <CarouselItem>
              <div class="carousel cal2"></div>
            </CarouselItem>
            <CarouselItem>
              <div class="carousel cal3"></div>
            </CarouselItem>
            <CarouselItem>
              <div class="carousel cal4"></div>
            </CarouselItem>
          </Carousel>
        </Col>
        <Col span="8">
          <Card class="margin-left-10">
            <h4 slot="title">
              <Icon type="android-archive"></Icon>
              日历
            </h4>
            <calender></calender>
          </Card>
        </Col>
      </Row>
      <Row class="margin-top-10">
        <Col span="12">
          <Card>
            <h4 slot="title">
              <Icon type="android-archive"></Icon>
              课程通知
            </h4>
            <div class="to-do-list-con">
              <div v-for="(item, index) in toDoList" :key="'todo-item' + (toDoList.length - index)" class="to-do-item">
                <li class="Li" :title="item.title">{{item.title}}</li>
              </div>
            </div>
          </Card>
        </Col>
        <Col span="12">
          <Card class="margin-left-10">
            <h4 slot="title">
              <Icon type="android-archive"></Icon>
              健身贴士
            </h4>
            <div class="to-do-list-con">
              <div v-for="(item, index) in toDoList1" :key="'todo-item' + (toDoList.length - index)" class="to-do-item">
                <li class="Li" :title="item.title">{{item.title}}</li>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
</template>

<script>
  import calender from './components/calendar.vue';
export default {
    name: 'home',
    components: {
      calender
    },

    data () {
        return {
          value3: 3,
          setting: {
            autoplay: true,
            autoplaySpeed: 4000,
            dots: 'inside',
            trigger: 'click',
            arrow: 'hover'
          },
          toDoList: [
            {
              title: '早8点哈他瑜伽课'
            },
            {
              title: '早10点阴瑜伽课'
            },
            {
              title: '午1点Popping课'
            },
            {
              title: '午3点理疗瑜伽课'
            },
            {
              title: '晚7点JAZZ课'
            },
            {
              title: '晚8点拳击课'
            }
          ],
          toDoList1: [
            {
              title: '锻炼时绝不能大量的喝水'
            },
            {
              title: '锻炼前吃糖可提高能量水平'
            },
            {
              title: '运动前禁吃某些食物'
            },
            {
              title: '游泳前不要进食'
            },
            {
              title: '吃盐可防止疲乏'
            },
            {
              title: '排汗可使人处于良好状态'
            }
          ],
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {

    }
};
</script>
<style scoped>
  .carousel{
    width: 100%;
    height: 420px;
    background-size: cover;
    background-position: center;
  }
  .cal1{
    background-image: url('../../images/b5.jpg');
  }
  .cal2{
    background-image: url('../../images/b2.png');
  }
  .cal3{
    background-image: url('../../images/b3.png');
  }
  .cal4{
     background-image: url('../../images/b4.png');
   }
  .Li{
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 20px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
