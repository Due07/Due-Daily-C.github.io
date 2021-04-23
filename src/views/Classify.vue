<template>
  <div class="Classify-warpper">
    <router-link class="search-btn" tag="div" to='/search'>
      <van-icon name="search" />
      <span>苹果1元1斤</span>
    </router-link>
    <!-- 一级导航 -->
    <one-tab />
    <template v-if="showContent">
      <!-- 二级导航 -->
      <side-bar />
    </template>
    <van-loading  v-else size='2rem' class="v-loading"/>
    <!-- 商品列表 -->
    <goods-list/>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import oneTab from '../components/OneTab.vue';
import sideBar from '../components/SideBar.vue';
import goodsList from '../components/GoodsList.vue';

export default {
  components: {
    oneTab,
    sideBar,
    goodsList,
  },
  computed: {
    ...mapState({
      showContent: (state) => state.showContent,
      sideList: (state) => state.sideList,
    }),
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
  },
  watch: {
    showContent() {
      if (this.showContent) {
        this.resetGoodsList();
        this.getGoodsList({ type: this.sideList[0], page: 1, sortType: 'all' });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.Classify-warpper {
  width: 375px;
  .search-btn {
    width: 355px;
    height: 33px;
    line-height: 33px;
    background-color: #eee;
    margin: 11px auto 0;
    font-size: 14px;
    color: #a1a1a1;
    border-radius: 10px;
    text-align: center;
    > * {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .v-loading{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>
