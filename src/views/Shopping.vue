<template>
  <div class="shopping-view" v-if="showShopping">
    <div class="nav">
      <van-nav-bar
    title="购物车"/>
    </div>
    <div class="shopp-content">
      购物车还是空的<br/>
      赶紧买点宝贝慰劳一下自己吧
    </div>
    <div class="list-btn" @click="$router.push('/home/classify')">去逛逛</div>

    <footer class='footer'>
      <div class="footer-head">———————店铺信息———————</div>
      <img src="../images/due.jpg" alt="">
      <div class="footer-text">Due模仿每日优鲜App</div>
    </footer>
  </div>
  <div class="shopping" v-else>
    <!-- 导航栏 -->
    <div class="top nav">
      <van-nav-bar title="购物车" right-text="删除" @click-right="del" />
    </div>
    <!-- 商品 -->
    <div class="card-list">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="card-box" v-for="item in list" :key="item.id">
          <van-checkbox class="check" :name="item.id"></van-checkbox>
          <goods-card v-bind="item" :num="counterMap[item.id]" :nofly="true"></goods-card>
        </div>
      </van-checkbox-group>
    </div>
    <!--提交订单栏 -->
    <van-submit-bar :price="allMoney" :button-text="`去结算(${totalNum})`" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { Toast, Dialog } from 'vant';
import goodsCard from '../components/GoodsCard.vue';

export default {
  components: {
    goodsCard,
  },
  data() {
    return {
      // 选中商品的id
      result: [],
      list: [],
      checked: false,
      showShopping: false,
    };
  },
  methods: {
    ...mapMutations(['storageChange']),
    async getAllData() {
      const result = Object.keys(this.counterMap);
      const res = await this.$api.getGoodsByIds(result.join());
      this.list = res.list;
      console.log('商品数据', this.list);
      this.showShopping = !(this.list.length > 0);
    },
    // 删除
    async del() {
      if (this.result.length === 0) {
        Toast('你还没选中商品');
      }
      try {
        await Dialog.confirm({ message: '您是否要删除选中商品' });
        this.result.forEach((id) => {
          // Infinity表示无穷大
          this.storageChange({ id, value: -Infinity });
          // 修改list商品的数据-->把删除的商品剔除
          this.list = this.list.filter((item) => !this.result.includes(item.id));
        });
      } catch (err) {
        Toast('用户点击了取消');
      }
      this.showShopping = !(this.list.length > 0);
    },
    onSubmit() {

    },
    // 全选
    checkAll() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    allMoney() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      return resArr.reduce((prev, next) => {
        const num = this.counterMap[next.id] || 0;
        return Math.round(num * next.price * 100) + prev;
      }, 0);
    },
    totalNum() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      const res = resArr.reduce((prev, next) => prev + (this.counterMap[next.id] || 0), 0);
      return res;
    },
  },
  watch: {
    result() {
      // console.length(this.result);
      if (this.result.length === this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  created() {
    this.getAllData();
  },
};
</script>

<style lang='less' scoped>
.shopping {
  background-color: #eee;
  min-height: 100vh;
  .top-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .card-list {
    width: 100%;
    position: absolute;
    top: 46px;
    z-index: 0;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background-color: #fff;
    .card-box {
      display: flex;
      justify-content: center;
    }
    .check {
      margin-right: 10px;
      // 是否压缩
      flex-shrink: 0;
    }
  }
  .van-submit-bar{
    bottom: 50px;
  }
}
.shopping-view{
  background-color: #fff;
  min-height: 100vh;
  color: #ff1a90;
  text-align: center;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  .nav{
    position: fixed;
    top: 0;
    width: 100%;
    border: 1px solid transparent;
    box-shadow:0px -4px 6px 0px rgba(0, 0, 0, .7);
    .van-nav-bar__title{
      width: 100%;
    }
  }
  .shopp-content{
    margin: 190px 0 20px;
    font-size: 18px;
  }
  .list-btn{
    width: 70px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ff1a90;
    border-radius: 12px;
    margin-bottom: 30px;
    font-size: 14px;
  }
  .footer{
    position: fixed;
    bottom: 120px;
    color: rgb(160, 160, 160);
    .footer-head{
      font-size: 16px;
      margin-bottom: 16px;
    }
    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    .footer-text{
      font-size: 14px;
    }
  }
}
</style>
