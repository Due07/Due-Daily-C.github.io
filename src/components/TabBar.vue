<template>
  <van-tabbar route fixed>
  <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
  <van-tabbar-item icon="apps-o" to="/home/classify">分类</van-tabbar-item>
  <van-tabbar-item
  icon="cart-o" to="/home/shopping"
  :badge="badge"
  id="shopping-car"
  >购物车</van-tabbar-item>
  <van-tabbar-item icon="user-circle-o" to="/home/me">我的</van-tabbar-item>
</van-tabbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
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
};
</script>

<style>

</style>
