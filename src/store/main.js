import { getWindowHeight } from '../utils/app';

export default {
  namespace: 'main',
  state: {
    windowHeight:getWindowHeight(),
    isLogIn:0, // 0默认 1登陆 2未登陆
    wxUserInfo:{},
    userScoreInfo:{score:'',rank:''},
    openid:'',
    userIsAuth: '0' // 是否认证，0:默认；1认证通过，3认证中，4认证失败
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
