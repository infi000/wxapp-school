import delay from '@/utils/delay';
import { goods, goodsSelected, Home, HomeSelected } from '@/static/images';
import { ROUTER_NAME_MAP } from '@/constants/index';

export default {
  namespace: 'tabbar',
  state: {
    nav: [
      {
        title: '行业资讯',
        type: ROUTER_NAME_MAP.industryNews,
        image: goods,
        selectedImage: goodsSelected,
      },
      {
        title: '在线培训',
        type: ROUTER_NAME_MAP.onlineStudy,
        image: goods,
        selectedImage: goodsSelected,
      },
      {
        title: '我的',
        type: ROUTER_NAME_MAP.me,
        image: Home,
        selectedImage: HomeSelected,
      },
    ],
    currentNavIndex: 0,
  },
  reducers: {
    updateNav: (state, { payload }) => {
      state.nav = payload;
    },
    updateCurrentNavIndex: (state, { payload }) => {
      state.currentNavIndex = payload;
    },
  },
  effects: {
    *asyncAdd(_, { all, call, put }) {
      yield call(delay, 2000); //增加延迟测试效果

      yield put({ type: 'add' });
    },
  },
};
