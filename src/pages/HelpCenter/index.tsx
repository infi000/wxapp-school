import Taro, { useDidShow, useState, useRouter } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import {  AtButton} from 'taro-ui';

import './index.scss';

const HelpCenter = (props) => {
  Taro.setNavigationBarTitle({
    title: '热线学堂',
  });
  const [hotClass, setHotClass] = useState([]);
  const router = useRouter();
  
  useDidShow(() => {
    const { params } = router;
    const { cid = 1 } = params || {};
  });

  return (
    <View className='basewrap helpCenter-wrap'>

    </View>
  );
};

export default HelpCenter;
