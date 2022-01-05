import { getWindowHeight } from '../utils/app';

export default {
  namespace: 'main',
  state: {
    windowHeight:getWindowHeight(),
    isLogIn:0, // 0默认 1登陆 2未登陆
    isShowMe: '1', // 是否展示"我的"按钮 1 | 0
    wxUserInfo:{},
    userScoreInfo:{score:'',rank:''},
    openid:'',
    userIsAuth: '0', // 是否认证，0:默认；1认证通过，3认证中，4认证失败
    newsInfo:{}
  },
  reducers: {
    updateIsLogIn: (state, {payload}) =>{
      state.isLogIn = payload;
    },
    updateWxUserInfo: (state, { payload }) => {
      state.wxUserInfo = payload;
    },
    updateOpenid: (state, { payload }) => {
      state.openid = payload;
    },
    updateNewsInfo: (state, { payload }) => {
      state.newsInfo = payload;
    },
    updateIsShowMe: (state, { payload }) => {
      state.isShowMe = payload;
    },
    updateUserScoreInfo: (state, { payload }) => {
      const { uid, scores } = payload;
      const info = scores.find((d) => d.id == uid);
      const rank = scores.findIndex((d) => d.id == uid);
      info.rank = Number(rank)+1;
      state.userScoreInfo = info;
    },
    updateUserIsAuth: (state, { payload }) => {
      state.userIsAuth = payload;
      // state.userIsAuth = '4';
    },
  },
  effects: {
   
  }
};
