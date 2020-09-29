import Taro from '@tarojs/taro';

import {ImgError} from '../static/images/index';

export function showErrorToast(msg) {
  console.log("msg",msg);
  Taro.showToast({
    title: msg||'错误',
    icon: 'none',
  })
}
export function showSuccessToast(msg) {
  Taro.showToast({
    title: msg,
    icon: 'success',
  })
}
export function showToast(msg) {
  Taro.showToast({
    title: msg,
    icon: 'none',
  })
}


export function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    Taro.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    Taro.redirectTo({
      url: url
    });
  }
}
