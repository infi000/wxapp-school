import Taro from '@tarojs/taro';
import { View, Checkbox, Video } from '@tarojs/components';
import TitleCon from '@/components/TitleCon';
import { isArray } from 'lodash';
import { AtTag } from 'taro-ui';
import './index.scss';
const { useState, useEffect } = Taro;

const ClassPlay = () => {
  return (
    <View className='classPlay-wrap'>
      <View className='vido-wrap'>
        <Video
          src='https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
          controls={true}
          autoplay={false}
          poster='https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
          initialTime={0}
          id='video'
          loop={false}
          muted={false}
        />
      </View>
      <View className='tool-wrap'>
        <View className='at-row'>
          <View className='at-col at-col-6 textC'>收藏</View>
          <View className='at-col at-col-6 textC'>分享</View>
        </View>
      </View>
      <View className='classList-wrap'>
        <TitleCon title='职场岗前培训课程' />
        <View className='at-row'>
          <View className='at-col at-col-6 '>
            <View className='classList-con'>
              <View className='classList-con-tag'>
                <AtTag size='small'>视频</AtTag>
              </View>
              <View className='classList-on-desc'>1.危机公关经验为0的法律人，如何处理危机并升职加薪（上）</View>
            </View>
          </View>
          <View className='at-col at-col-6'>
            <View className='classList-con'>
              <View className='classList-con-tag'>
                <AtTag size='small'>视频</AtTag>
              </View>
              <View className='classList-on-desc'>1.危机公关经验为0的法律人，如何处理危机并升职加薪（上）</View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ClassPlay;
