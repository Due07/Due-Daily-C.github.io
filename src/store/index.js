import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
    showContent: false,
    size: 5,
    goodsList: [],
    type: null,
    // 加入购物车的商品、数量
    counterMap: {},
  },
  mutations: {
    // 对counterMap数据进行操作
    storageChange(state, { id, value }) {
      if (state.counterMap[id]) {
        if ((value === -1 && state.counterMap[id] === 1) || value === -Infinity) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      // 修改后进行存储
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
    // 本地化储存
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    setSideList(state, list) {
      state.sideList = list;
    },
    setShowContent(state, bool) {
      state.showContent = bool;
    },
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
    },
    // 初始化重置goodslist
    resetGoodsList(state) {
      state.goodsList = [];
    },
    setGoodsType(state, type) {
      state.type = type;
    },
  },
  actions: {
    async getSideList({ commit }, type) {
      commit('setShowContent', false);
      const value = await api.getSideList(type);
      commit('setSideList', value);
      commit('setShowContent', true);
      // console.log(value);
    },
    async getGoodsList({ state }, options) {
      const { page, sortType } = options;
      const type = options.type || state.type;
      this.commit('setGoodsType', type);
      const { list, total } = await api.getGoodsList(type, page, state.size, sortType);
      this.commit('setGoodsList', list);
      if (total > state.goodsList.length) {
        return true;
      }
      return false;
    },
  },
  modules: {},
});
