<template>
  <div class="list-wrapper">
    <div class="list-header van-hairline--top-bottom"
    @click="changeType($event)">
      <span data-type="all" :class="{'active':type=='all'}">综合</span>
      <span data-type="sale" :class="{'active':type=='sale'}">销量</span>
      <span
        :data-type="price"
        class="price"
        :class="{'price-up':type=='price-up',
                    'price-down':type=='price-down'}"
      >价格</span>
    </div>

    <!-- 商品 -->
    <div class="list-content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了" @load="onLoad"
            :immediate-check='false'>
            <goods-card
                v-for="item in goodsList"
                :key="item.id"
                v-bind="item"
                :num="counterMap[item.id]"
            >
            </goods-card>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import goodsCard from './GoodsCard.vue';

export default {
  components: {
    goodsCard,
  },
  data() {
    return {
      type: 'all',
      price: 'price-up',
      isLoading: false,
      loading: false,
      finished: false,
      page: 1,
    };
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
    // 下拉刷新
    onRefresh() {
      this.isloading = true;
      this.finished = false;
      this.loading = false;
      this.page = 1;
      this.resetGoodsList();
      this.getGoodsList({ page: 1, sortType: this.type });
      this.isLoading = false;
    },
    async onLoad() {
      this.page += 1;
      this.loading = true;
      const result = await this.getGoodsList({ page: this.page, sortType: this.type });
      if (result) {
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
    changeType(e) {
      if (e.target.dataset.type === 'price-up') {
        this.price = 'price-down';
      } else if (e.target.dataset.type === 'price-down') {
        this.price = 'price-up';
      }
      this.type = e.target.dataset.type;
      this.onRefresh();
    },
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.goodsList,
      counterMap: (state) => state.counterMap,
    }),
  },
};
</script>

<style lang="less" scoped>
.list-header {
  width: 296px;
  position: relative;
  top: 0;
  left: 79px;
  box-sizing: border-box;
  padding-right: 8px;
  display: flex;
  justify-content: flex-end;
  > span {
    width: 50px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #cecece;
  }
  .active,
  .price-up,
  .price-down {
    color: #ff1a90;
    font-weight: bold;
  }
  .price {
    position: relative;
    &::before {
      content: "";
      border: 4px solid transparent;
      border-bottom-color: #aaa;
      position: absolute;
      top: 4px;
      right: 0;
    }
    &::after {
      content: "";
      border: 4px solid transparent;
      border-top-color: #aaa;
      position: absolute;
      bottom: 4px;
      right: 0;
    }
  }

  .price-up::before {
    border-bottom-color: #ff1a90;
  }
  .price-down::after {
    border-top-color: #ff1a90;
  }
}
.list-content{
    width: 296px;
    position: fixed;
    top: 162px;
    right: 0;
    bottom: 50px;
    overflow: auto;
  .van-pull-refresh{
      overflow:unset !important;
}
}
</style>
