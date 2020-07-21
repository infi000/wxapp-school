import delay from '@/utils/delay';
import {
  hangyezixun1,
  hangyezixun2,
  zaixianpeixun1,
  zaixianpeixun2,
  xuexikaoshi1,
  xuexikaoshi2,
} from '@/static/images';
import { ROUTER_NAME_MAP } from '@/constants/index';

export default {
  namespace: 'tabbar',
  state: {
    nav: [
      {
        title: '行业资讯',
        type: ROUTER_NAME_MAP.industryNews,
        image: hangyezixun1,
        selectedImage: hangyezixun2,
      },
      {
        title: '在线培训',
        type: ROUTER_NAME_MAP.onlineStudy,
        image: zaixianpeixun1,
        selectedImage: zaixianpeixun2,
      },
      {
        title: '我的',
        type: ROUTER_NAME_MAP.me,
        image: xuexikaoshi1,
        selectedImage: xuexikaoshi2,
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
