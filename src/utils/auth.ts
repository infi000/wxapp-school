import Taro from '@tarojs/taro';
import { getJscode2session, saveUserData, getScorepos, getUserIsauth } from '@/services/user';
import { isArray } from 'lodash';

export const logIn = (dispatch, SuccessCb?: Function, errorCb?: Function) =>
  Taro.login({
    success: async function(res) {
      console.log('res', res);
      if (res.code) {
        //发起网络请求
        const { code } = res;
        getJscode2session({ jscode: code }).then((d) => {
          const openid = d;
          Taro.getUserInfo({
            success: function(res) {
              var userInfo = res.userInfo;
              var nickName = userInfo.nickName;
              var avatarUrl = userInfo.avatarUrl;
              var gender = userInfo.gender; //性别 0：未知、1：男、2：女
              var province = userInfo.province;
              var city = userInfo.city;
              var country = userInfo.country;
              saveUserData({ nickname: nickName, avatarurl: avatarUrl, gender, province, country, city, openid })
                .then(() => {
                  Taro.setStorage({ key: 'wxUserInfo', data: { nickName, avatarUrl, gender, province, country, city, openid } });
                  dispatch({ type: 'main/updateIsLogIn', payload: 1 });
                  dispatch({ type: 'main/updateWxUserInfo', payload: { nickName, avatarUrl, gender, province, country, city, openid } });
                  dispatch({ type: 'main/updateOpenid', payload: openid });
                  getScorepos()
                    .then((d) => {
                      const { uid, scores } = d || {};
                      if (uid && isArray(scores)) {
                        dispatch({ type: 'main/updateUserScoreInfo', payload: d });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  getUserIsauth()
                    .then((d) => {
                      dispatch({ type: 'main/updateUserIsAuth', payload: d });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                    SuccessCb && setTimeout(SuccessCb,0);
                })
                .catch((err) => {
                  console.log(err);
                });
            },
          });
        });
      } else {
        console.log('登录失败！' + res.errMsg);
        errorCb && errorCb();
      }
    },
  });
