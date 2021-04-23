import Axios from 'axios';
import baseURL, { URLS } from './URLS';

const appkey = 'Due37_1617176129758';
const request = Axios.create({
  baseURL,
  params: {
    appkey,
  },
});

request.interceptors.response.use((val) => val.data);

// 获取二级列表
const getSideList = (type) => request.get(URLS.getsidebar, {
  params: { type },
});
// 获取商品
const getGoodsList = (type, page, size, sort) => request.get(
  URLS.getGoodsList, {
    params: {
      type,
      page,
      size,
      sort,
    },
  },
);
// 搜索请求
const search = (type, page, size) => request.get(
  URLS.search, {
    params: {
      type,
      page,
      size,
    },
  },
);
// 模糊搜索
const likeSearch = (value) => request.get(
  URLS.likeSearch, {
    params: { likeValue: value },
  },
);
// Id搜索 购物车渲染
const getGoodsByIds = (value) => request.get(
  URLS.getGoodsByIds, {
    params: { value },
  },
);
export default {
  getSideList,
  getGoodsList,
  search,
  likeSearch,
  getGoodsByIds,
};
