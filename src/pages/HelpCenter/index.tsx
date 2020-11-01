import Taro, { useDidShow, useState,useRouter } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import './index.scss';

const HelpCenter = (props) => {
  Taro.setNavigationBarTitle({
    title: '帮助中心',
  });
  const [hotClass, setHotClass] = useState([]);
  const router = useRouter();

  useDidShow(() => {
    const { params } = router;
    const { cid = 1 } = params || {};
  
  });

  return (
    <View className='basewrap helpCenter-wrap'>
        帮助中心
    </View>
  );
};

export default HelpCenter;
