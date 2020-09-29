import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import MyAvatar from './modules/MyAvatar';
import './index.scss';

import Others from './modules/Others';

const Me = () => {
  return (
    <View className='me-wrap'>
      <MyAvatar />
      <View className='order-sales-con'>
   
      </View>
      <Others />
    </View>
  );
};

export default Me;
