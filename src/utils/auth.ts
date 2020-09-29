import Taro from '@tarojs/taro';
import { getJscode2session, saveUserData } from '@/services/user';

export const logIn = (dispatch) =>
  Taro.login({
    success: async function(res) {
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
              saveUserData({ nickName, avatarUrl, gender, province, country, city, openid }).then(() => {
                Taro.setStorage({ key: 'wxUserInfo', data: { nickName, avatarUrl, gender, province, country, city, openid } });
                dispatch({ type: 'main/updateIsLogIn', payload: true });
                dispatch({ type: 'main/updateWxUserInfo', payload: { nickName, avatarUrl, gender, province, country, city, openid } });
                dispatch({ type: 'main/updateOpenid', payload: openid });
              });
            },
          });
        });
      } else {
        console.log('登录失败！' + res.errMsg);
      }
    },
  });
