import Taro from '@tarojs/taro';
import { showErrorToast, showMessage } from '../utils/util';
import { set as setGlobalData, get as getGlobalData } from '../global_data';
/**
 * 封封微信的的request
 */
function request(url, data = {}, method = 'GET') {
  const fekeOpenid = getGlobalData('FAKE_OPENID');
  let openid = fekeOpenid;
  let header = {
    'Content-Type': 'application/json',
  };
  try {
    const value = Taro.getStorageSync('wxUserInfo');
    if (value) {
      openid = fekeOpenid || value.openid;
    }
  } catch (e) {}

  if (method === 'FORM') {
    data.append('openid', openid);
    header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  } else if (method === 'POST') {
    data = { openid, ...data };
    header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  } else {
    data = { openid, ...data };
  }
  return new Promise(function(resolve, reject) {
    Taro.request({
      url,
      data,
      method,
      header,
      success: function(res) {
        if (res.statusCode == 200) {
          if (res.data.errno == 501) {
            // 清除登录相关内容
            try {
              // Taro.removeStorageSync('userInfo');
              // Taro.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }
            // 切换到登录页面
            // Taro.navigateTo({
            //   url: '/pages/auth/login/login'
            // });
          } else if (res.data.res == 'succ') {
            resolve(res.data.data);
          } else {
            console.log('res', res);
            if (res.data.code == -11) {
              Taro.removeStorageSync('userInfo');
              Taro.removeStorageSync('token');
              Taro.redirectTo({
              url: '/pages/Login/index'
            });
            } else {
              showErrorToast(res.data.errdata || res.data);
            }
            reject(res.data.errdata);
          }
        } else {
          console.log('res', res);
          showErrorToast('接口错误');
          // reject(res.errdata);
        }
      },
      fail: function(err) {
        console.log(err);
        // reject(err);
      },
    });
  });
}

request.get = (url, data) => {
  return request(url, data, 'GET');
};

request.post = (url, data) => {
  return request(url, data, 'POST');
};

request.form = (url, data) => {
  return request(url, data, 'FORM');
};

request.formData = (url, data) => {
  let openid = '';
  try {
    const value = Taro.getStorageSync('wxUserInfo');
    if (value) {
      openid = value.openid;
    }
  } catch (e) {}

  return new Promise(function(resolve, reject) {
    Taro.uploadFile({
      url: url,
      filePath: [],
      name: 'file',
      formData: {
        'openid': openid,
        ...data,
      },
      success: function(res) {
        if (res.statusCode == 200) {
          if (res.data.errno == 501) {
            // 清除登录相关内容
            try {
              // Taro.removeStorageSync('userInfo');
              // Taro.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }
            // 切换到登录页面
            // Taro.navigateTo({
            //   url: '/pages/auth/login/login'
            // });
          } else if (res.data.res == 'succ') {
            resolve(res.data.data);
          } else {
            // Taro.showModal({
            //   title: '错误信息',
            //   content: res.data.errmsg,
            //   showCancel: false
            // });
            console.log('res', res);
            showErrorToast(res.data.errdata);
            // reject(res.data.errdata);
          }
        } else {
          console.log('res', res);
          showErrorToast(res.data.errdata);
        }
      },
      fail: function(err) {
        console.log(err);
        showErrorToast('接口错误');
        // reject(err);
      },
    });
  });
};

export default request;
