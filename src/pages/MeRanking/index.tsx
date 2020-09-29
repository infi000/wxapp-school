import Taro, { useDidShow, useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

const MeRanking = () => {
  const router = useRouter();
  useDidShow(() => {
    const { params } = router;
    Taro.setNavigationBarTitle({
      title: '名次排行',
    });
  });
  return (
    <View className='meranking-wrap'>
      <View className='meranking-top'>
        <View className='at-row at-row__justify--between '>
          <View className='at-col at-col-3'>名次：5</View>
          <View className='at-col at-col-6'>姓名：王小明</View>
          <View className='at-col at-col-3'>433</View>
        </View>
      </View>
      <View className='meranking-mid'>
        <View className='meranking-con'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13,14,15,16,17,18,19].map((text) => (
            <View className='at-row at-row__justify--between meranking-line' key={text}>
              <View className='at-col at-col-2 meranking-line-l'>1</View>
              <View className='at-col at-col-8 meranking-line-m'>张三</View>
              <View className='at-col at-col-2 meranking-line-r'>599</View>
            </View>
          ))}
        </View>
        <View className='meranking-mid-bottom'>排名：5</View>
      </View>
    </View>
  );
};

export default MeRanking;
