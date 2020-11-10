import Taro, { useDidShow, useRouter } from '@tarojs/taro';
import { View, Block, Video } from '@tarojs/components';
import TitleCon from '@/components/TitleCon';
import { isArray } from 'lodash';
import { AtTag } from 'taro-ui';
import './index.scss';
const { useState, useEffect } = Taro;

const ClassPlay = () => {
  const [info, setInfo] = useState({ cwid: '', fpath: '', id: '', cwname: '' });
  const router = useRouter();
  useDidShow(() => {
    const { params } = router;
    const { cwid, fpath, id, cwname } = params || {};
    setInfo({ cwid, fpath, id, cwname });
    Taro.setNavigationBarTitle({
      title:'华鑫学堂',
    });
  });

  return (
    <View className='classPlay-wrap'>
      <View className='vido-wrap'>
        <Video src={info.fpath} controls={true} autoplay={false} initialTime={0} id='video' loop={false} muted={false} />
      </View>
      {false && (
        <Block>
          <View className='tool-wrap'>
            <View className='at-row'>
              <View className='at-col at-col-6 textC'>收藏</View>
              <View className='at-col at-col-6 textC'>分享</View>
            </View>
          </View>
          <View className='classList-wrap'>
            <TitleCon title='职场岗前培训课程' />
            <View className='at-row'>
              <View className='at-col at-col-6 classList-con'>
                <View className='classList-con-box'>
                  <View className='classList-con-tag'>
                    <AtTag size='small'>视频</AtTag>
                  </View>
                  <View className='classList-on-desc'>1.危机公关经验为0的法律人，如何处理危机并升职加薪（上）</View>
                </View>
              </View>
              <View className='at-col at-col-6 classList-con'>
                <View className='classList-con-box'>
                  <View className='classList-con-tag'>
                    <AtTag size='small'>视频</AtTag>
                  </View>
                  <View className='classList-on-desc'>1.危机公关经验为0的法律人，如何处理危机并升职加薪（上）</View>
                </View>
              </View>
            </View>
          </View>
        </Block>
      )}
    </View>
  );
};

export default ClassPlay;
