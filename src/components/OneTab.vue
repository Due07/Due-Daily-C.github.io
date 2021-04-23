<template>
  <ul class="one-tab-wrapper" ref="wrapper">
    <li class="tab-item"
    v-for="(item,i) in menuList"
    :key="item.title"
    :class="{active:index===i}"
    @touchend="scrollTo(i,$event)"
    @touchstart="move=false"
    @touchmove="move=true">
      <div class="img-wrapper">
        <img :src="item.imgURL" :alt="item.title" />
      </div>
      <div class="tab-title">{{ item.title }}</div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex';
import run from '../util/run';

export default {
  data() {
    return {
      move: false,
      index: '',
      menuList: [
        {
          title: '时令水果',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['getSideList']),
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      // 点击后滑动到中间
      const { wrapper } = this.$refs;
      const itemwidth = e.target.offsetWidth;
      // getBoundingClientRect().left 和 offsetLeft 有区别
      // offsetLeft-->距离可视区域边的值
      // getBoundingClientRect().left -->距离可视区域边的值，包括滚动条卷起的部分
      const itemleft = e.target.getBoundingClientRect().left;
      const wrapperWidth = wrapper.offsetWidth; // 父级整个宽度
      run.moveTo(wrapper.scrollLeft, itemwidth / 2 + itemleft - wrapperWidth / 2, wrapper, 'scrollLeft');
      // 获取侧边栏数据(sidebar + data)
      this.getSideList(this.menuList[i].title);
    },

  },
  mounted() {
    // 获取二级列表
    this.getSideList(this.menuList[0].title);
  },
};
</script>

<style lang='less' scoped>
.one-tab-wrapper {
  width: 375px;
  height: 94px;
  display: flex;
  overflow: auto;
  .tab-item {
    width: 50px;
    height: 70px;
    padding: 10px 5px;
    .img-wrapper {
      width: 50px;
      height: 50px;
      border: 2px solid;
      border-color: #fff;
      border-radius: 23px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        align-self: center;
      }
    }
    .tab-title {
      text-align: center;
      font-size: 12px;
      margin-top: 5px;
    }
  }
  .active {
    .img-wrapper {
      border-color: #d13193;
    }
    .tab-title {
      color: #fff;
      background-color: #d13193;
      font-weight: bold;
      border-radius: 30px;
    }
  }
}
// 取消滚动条
.one-tab-wrapper::-webkit-scrollbar{
  width: 0;
  background: none;
}
</style>
