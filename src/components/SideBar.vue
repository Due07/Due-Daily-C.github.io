<template>
  <div class="side-bar-wrapper" ref="side">
    <div
      v-for="(item,i) in sideList"
      :key="item"
      :class="{active: index === i }"
      @touchend="scrollTo(i,$event)"
      @touchstart="move=false"
      @touchmove="move=true"
    >{{i==0? '全部' : item}}</div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import run from '../util/run';

export default {
  data() {
    return {
      move: false,
      index: 0,
    };
  },
  computed: {
    // mapState state的辅助函数
    ...mapState({
      sideList: (state) => state.sideList,
    }),
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      const { side } = this.$refs;
      const sonTop = e.target.getBoundingClientRect().top;
      const sonHeight = e.target.offsetHeight;
      const fathTop = side.getBoundingClientRect().top;
      const fathHeight = side.offsetHeight;
      run.moveTo(
        side.scrollTop,
        sonTop + sonHeight / 2 - fathTop - fathHeight / 2,
        side,
        'scrollTop',
      );
      // 初始化商品数据
      this.resetGoodsList();
      // 获取列表页操作
      this.getGoodsList({ type: this.sideList[i], page: 1, sortType: 'all' });
    },
  },
  mounted() {
    // this.resetGoodsList();
    // // 加载商品列表
    // this.getGoodsList({ type: this.sideList[0], page: 1, sortType: 'all' });
  },
};
</script>

<style lang='less' scoped>
.side-bar-wrapper {
  position: fixed;
  left: 0;
  width: 79px;
  top: 138px;
  bottom: 50px;
  overflow: auto;
  background: #f8f8f8;
  div {
    width: 79px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .active {
    font-weight: bold;
    color: #ff1a90;
  }
  .active::before {
    content: "";
    position: absolute;
    width: 6px;
    height: 18px;
    background-color: #ff1a90;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
}
.side-bar-wrapper::-webkit-scrollbar {
  width: 0;
  background: none;
}
</style>
