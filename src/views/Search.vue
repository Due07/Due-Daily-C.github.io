<template>
  <div class="search-wrapper">
    <div class="search-header">
      <van-icon name="arrow-left" class="arr-left" @click="$router.goBack()"/>
      <van-search
        class="search-content"
        v-model="value"
        show-action
        :placeholder="place"
        @search="onSearch"
        @input="input"
        @focus="focus"
      >
      <template #action v-if="showList">
          <div @touchend='onSearch(value)'>搜索</div>
      </template>
      <template #action v-else>
          <van-icon
          name="cart-o"
          id="shopping-car" class="shopp-car"
          :badge="badge"
          @click="$router.push('/home/shopping')"
          />
      </template>
      </van-search>
    </div>
    <!-- 搜索列表 -->
    <div class="like-search" v-if="likeList.length&&showList">
      <van-list>
        <van-cell v-for="item in likeList" :key="item" @click="onSearch(item)">
          <template>
            <span class="custom-title" v-html="formatHTML(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <!-- 搜索后的列表 -->
    <div class="goods-list" v-if="!showList">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <goods-card
          v-for="item in goodsList"
          :key="item.id"
          v-bind="item"
          :num="counterMap[item.id]"
        ></goods-card>
      </van-list>
    </div>
    <!-- 搜索历史记录 -->
    <div class="my-history" v-if="likeList.length <=0 && showList">
        <my-history :searchList="searchList" @search="onSearch"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import goodsCard from '../components/GoodsCard.vue';
import myHistory from '../components/MyHistory.vue';

export default {
  components: {
    goodsCard,
    myHistory,
  },
  data() {
    return {
      place: '酒',
      value: this.place,
      likeList: [],
      timer: null,
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      goodsList: [],
      showList: true,
      total: 0,
      searchList: [],
    };
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    // 购物车数量
    badge() {
      const count = Object.values(this.counterMap).reduce((pre, next) => pre + next, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
  methods: {

    // 搜索显示列表
    async onLoad() {
      this.showList = false;
      const value = await this.$api.search(this.value, this.page, this.size);
      console.log(value);
      this.goodsList = [...this.goodsList, ...value.list];
      this.total = value.total;
      this.loading = false;
      if (this.goodsList.length >= this.total) {
        this.finished = true;
      } else {
        this.page += 1;
      }
    },
    // 搜索
    onSearch(value) {
      if (value) {
        this.value = value;
      } else {
        this.value = this.place;
      }
      //  当数组中的元素在测试条件时返回 true 时,
      // find() 返回符合条件的元素，之后的值不会再调用执行函数。
      const result = this.searchList.find((item) => item.value === this.value);
      if (result) {
        result.time = new Date().getTime();
        this.searchList.sort((a, b) => b.time - a.time);
        console.log(this.searchList);
      } else {
        this.searchList.unshift({ value: this.value, time: new Date().getTime() });
        if (this.searchList.length >= 11) {
          this.searchList.pop();
        }
      }
      // 存储搜索记录
      localStorage.setItem('searchList', JSON.stringify(this.searchList));
      this.likeList = [];
      this.goodsList = [];
      this.page = 1;
      this.finished = false;
      this.onLoad();
      this.showList = false;
    },
    async input() {
      if (this.value === '') {
        this.likeList = [];
      }

      // 防抖 节流
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => {
          const value = await this.$api.likeSearch(this.value);
          //   console.log(value);
          this.likeList = value.result;
          clearTimeout(this.timer);
          this.timer = null;
        }, 500);
      }
    },
    focus() {
      this.showList = true;
    },
    // 修改搜索提示字颜色显示
    formatHTML(item) {
      const reg = new RegExp(this.value, 'g');
      // replace替换函数 不过 要使用regExp（正则）的对象
      return item.replace(reg, this.value.fontcolor('red'));
    },
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem('searchList')) || [];
  },
};
</script>

<style lang='less' scoped>
.search-wrapper {
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: #fff;
  .search-header {
    position: fixed;
    top: 0;
    left: 15px;
    z-index: 22;
    width: 345px;
    background-color: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .arr-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
      .shopp-car{
          font-size: 15px;
      }
    }
  }
  .like-search {
    position: relative;
    top: 50px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 34px;
  }
  .goods-list{
      position: relative;
      width: 345px;
      margin: 48px auto 0;
      z-index: 10;
      background-color: #fff;
  }
  .my-history{
      width: 350px;
      position: absolute;
      top:35px;
      left: 10px;
      z-index: 1;
  }
}
</style>
