import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtAvatar } from 'taro-ui';
import { meJgcx, meJpkc, meKscy, meScxz } from '@/static/images/index';

import '../index.scss';

const MyAvatar = () => {
  const handleToExamClass = () => {
    Taro.navigateTo({ url: '/pages/ExamClass/index' });
  };
  const handleToClassDetail = () => {
    Taro.navigateTo({ url: '/pages/ClassDetail/index' });
  };
  return (
    <View className='my-avatar-con'>
      <View className='at-row at-row__align--center  my-avatar-top'>
        <View className='at-col  at-col-3'>
          <AtAvatar circle image='https://jdc.jd.com/img/200'></AtAvatar>
        </View>
        <View className='at-col'>这是我的名字</View>
      </View>
      <View className='at-row at-row--wrap  my-avatar-bottom'>
        <View className='at-col at-col-4'>
          <View className='my-avatar--icon'  onClick={handleToClassDetail}>
            <Image src={meJpkc}  style={{ height: '100%', width: '100%' }} mode='aspectFill' />
          </View>
          <View className='my-avatar-desc'>精品课程</View>
        </View>
        <View className='at-col at-col-4'>
          <View className='my-avatar--icon' onClick={handleToExamClass}>
            <Image src={meKscy} style={{ height: '100%', width: '100%' }} mode='aspectFill' />
          </View>
          <View className='my-avatar-desc'>考试测验</View>
        </View>
        <View className='at-col at-col-4'>
          <View className='my-avatar--icon'>
            <Image src={meJgcx} style={{ height: '100%', width: '100%' }} mode='aspectFill' />
          </View>
          <View className='my-avatar-desc'>结果查询</View>
        </View>
      </View>
    </View>
  );
};

export default MyAvatar;
