import Taro from '@tarojs/taro';
import { View, Button, Block } from '@tarojs/components';
import { AtFloatLayout } from 'taro-ui';
import { useSelector, useDispatch } from '@tarojs/redux';
import Tabbar from '@/components/Tabbar';
import IndustryNews from '@/pages/IndustryNews';
import OnlineStudy from '@/pages/OnlineStudy';
import Me from '@/pages/Me';
import { ROUTER_NAME_MAP } from '@/constants/index';
import { logIn } from '@/utils/auth';
import {logo12345} from '@/static/images';
import '../Me/index.scss';
import './index.scss';

const Main = (props) => {
  const { nav, currentNavIndex } = useSelector((state) => state.tabbar);
  const { isLogIn } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const handleLogIn = (e) => {
    console.log(e);
    logIn(dispatch);
  };
  console.log('isLogIn=====', isLogIn);
  return (
    <View>
      {isLogIn === 0 && <View></View>}
      {isLogIn === 1 && (
        <Block>
          {nav[currentNavIndex].type == ROUTER_NAME_MAP.industryNews && <IndustryNews />}
          {nav[currentNavIndex].type == ROUTER_NAME_MAP.onlineStudy && <OnlineStudy />}
          {nav[currentNavIndex].type == ROUTER_NAME_MAP.me && <Me />}
          <Tabbar />
        </Block>
      )}
      {/* {isLogIn === 2 && (
        <AtFloatLayout isOpened={isLogIn === 2}>
          <View className='sq-box'>
            <View className='sq-line1'>申请获取您的以下权限:</View>
            <View className='sq-line2'>获得您的公开信息(昵称、头像等)</View>
            <View className='sq-line3'>
              <Button open-type='getUserInfo' onGetUserInfo={handleLogIn}>
                授权登陆
              </Button>
            </View>
          </View>
        </AtFloatLayout>
      )} */}
      {isLogIn === 2 && (
        <View className='sq-box'>
          <Image mode='aspectFill' src={logo12345}  style='width: 300px;height: 100px;background: #fff;' />
          <View className='sq-line1'>申请获取您的以下权限:</View>
          <View className='sq-line2'>获得您的公开信息(昵称、头像等)</View>
          <View className='sq-line3'>
            <Button open-type='getUserInfo' onGetUserInfo={handleLogIn}>
              授权登陆
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default Main;
