import Taro, { useDidShow, useRouter } from '@tarojs/taro';
import { View, Block, Video } from '@tarojs/components';
import TitleCon from '@/components/TitleCon';
import { get, isArray } from 'lodash';
import { AtTag, AtButton } from 'taro-ui';
import { getCourseDetail } from './services';
import { CWTYPE_MAP } from './canstants';
import './index.scss';
const { useState, useEffect } = Taro;

const ClassPlay = () => {
  const [info, setInfo] = useState({ cwid: '', fpath: '', id: '', cwname: '', cid: '', cwtype: '' });
  const [classDetail, setClassDetail]: [any, any] = useState({});
  const [videoShow, setVideoShow]: [any, any] = useState(true);
  const router = useRouter();
  useDidShow(() => {
    const { params } = router;
    const { cwid, fpath, id, cwname, cid, cwtype } = params || {};
    console.log("params",params);
    setInfo({ cwid, fpath, id, cwname, cid, cwtype });
    Taro.setNavigationBarTitle({
      title: 'DI动力课堂',
    });
    getCourseDetail({ cid }).then((d) => {
      setClassDetail(d);
    });
  });
  const handleChooseVideo = (params) => {
    const { files, cwname } = params;
    setInfo((opt) => {
      return { ...opt, cwid: files[0].cwid, fpath: files[0].fpath, id: files[0].id, cwname };
    });
    setVideoShow(false);
    setTimeout(() => {
      setVideoShow(true);
    }, 100);
  };
  const sourceware = get(classDetail, ['sourceware'], []);
  const handlePlayLive = () => {
   
    const url = `/pages/Live/index?url=${encodeURIComponent(info.fpath)}`;
    Taro.navigateTo({ url });
  }
console.log(info);
  return (
    <View className='classPlay-wrap'>
      <View className='vido-wrap'>
        {
           videoShow &&  info.cwtype == 3 && <AtButton type='primary' className='btn-live' onClick={handlePlayLive}>点击观看直播</AtButton>
        }
        {
           videoShow &&  info.cwtype == 1 &&  <Video src={info.fpath} controls={true} autoplay={false} initialTime={0} id='video' loop={false} muted={false} />
        }
      </View>
      <Block>
        <View className='tool-wrap'>
          <View className='at-row'>
            {/* <View className='at-col at-col-6 textC'>收藏</View>
              <View className='at-col at-col-6 textC'>分享</View> */}
            <View className='at-col at-col-12 textC'>当前播放：{info.cwname || '-'} </View>
          </View>
        </View>
        <View className='classList-wrap'>
          <TitleCon title='相关视频' />
          <View className='at-row at-row--wrap'>
            {sourceware.length > 0
              ? sourceware.map((item) => {
                  return (
                    (item.cwtype == 1 || item.cwtype == 3)&& (
                      <View className='at-col at-col-6 classList-con' key={item.id} onClick={() => handleChooseVideo(item)}>
                        <View className='classList-con-box'>
                          <View className='classList-con-tag'>
                            <AtTag size='small'>{CWTYPE_MAP[item.cwtype]}</AtTag>
                          </View>
                          <View className='classList-on-desc' >
                            {item.cwname}
                          </View>
                        </View>
                      </View>
                    )
                  );
                })
              : null}
          </View>
        </View>
      </Block>
    </View>
  );
};

export default ClassPlay;
