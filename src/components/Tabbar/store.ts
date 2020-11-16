import delay from '@/utils/delay';
import {
  hangyezixun1,
  hangyezixun2,
  zaixianpeixun1,
  zaixianpeixun2,
  xuexikaoshi1,
  xuexikaoshi2,
  kx1,
  kx2,
  epx1,
  epx2,
  wo1,
  wo2
} from '@/static/images';
import { ROUTER_NAME_MAP } from '@/constants/index';

export default {
  namespace: 'tabbar',
  state: {
    nav: [
      {
        title: '快讯',
        type: ROUTER_NAME_MAP.industryNews,
        image: kx1,
        selectedImage: kx2,
      },
      {
        title: 'e培训',
        type: ROUTER_NAME_MAP.onlineStudy,
        image: epx1,
        selectedImage: epx2,
      },
      {
        title: '@我',
        type: ROUTER_NAME_MAP.me,
        image: wo1,
        selectedImage: wo2,
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
