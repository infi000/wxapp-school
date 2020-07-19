import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import MyAvatar from './modules/MyAvatar';
import Others from './modules/Others';

import './index.scss';

const Me = () => {
  return (
    <View className='me-wrap'>
      <MyAvatar/>
      <Others/>
    </View>
  );
};

export default Me;
