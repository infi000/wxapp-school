import Taro, { useDidShow, useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

const MeScore = () => {
  const router = useRouter();
  useDidShow(() => {
    const { params } = router;
    Taro.setNavigationBarTitle({
      title: 'DI动力课堂',
    });
  });
  return (
    <View className='meScore-wrap'>
      <View className='meScore-top'>我的总积分：433</View>
      <View className='meScore-mid'>
        <View className='meScore-tag'>积分历史</View>
        <View className='meScore-con'>
          <View className='at-row at-row__justify--between meScore-con-line'>
            <View className='at-col at-col-3'>名次：5</View>
            <View className='at-col at-col-6'>姓名：王小明</View>
            <View className='at-col at-col-3'>433</View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MeScore;
