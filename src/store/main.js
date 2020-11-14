import { getWindowHeight } from '../utils/app';

export default {
  namespace: 'main',
  state: {
    windowHeight:getWindowHeight(),
    isLogIn:false,
    wxUserInfo:{},
    userScoreInfo:{score:'',rank:''},
    openid:''
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
      info.rank = rank
      state.userScoreInfo = info;
    },
  },
  effects: {
   
  }
};
