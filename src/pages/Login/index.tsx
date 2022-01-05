import Taro from '@tarojs/taro';
import { View, Button, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { ROUTER_NAME_MAP } from '@/constants/index';
import { logIn } from '@/utils/auth';
import { logo12345 } from '@/static/images';
import '../Me/index.scss';
import './index.scss';

const Main = (props) => {
  const { isLogIn } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const handleLogIn = (e) => {
    // console.log(e);
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        logIn({ dispatch, userInfo: res.userInfo });
      }
    })
    Taro.redirectTo({
      url: '/pages/Main/index'
    });
  };
  console.log('isLogIn=====', isLogIn);
  return (
    <View>
      <View className='sq-box'>
        <Image mode='aspectFill' src={logo12345} style='width: 300px;height: 100px;background: #fff;' />
        <View className='sq-line1'>申请获取您的以下权限:</View>
        <View className='sq-line2'>为了提供DI领队、DI裁判实名认证和推送培训资料，开发者将在获取你的明示同意后，收集你的微信昵称、头像。</View>
        <View className='sq-line3'>
          <Button onClick={handleLogIn}>
            授权登陆
            </Button>
        </View>
      </View>
    </View>
  );
};

export default Main;
