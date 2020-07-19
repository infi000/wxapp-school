import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import TitleCon from '@/components/TitleCon/index';
import { TOTAL_CLASS } from '@/constants/index';
import { defaultAudio } from '@/static/images/index';

import './index.scss';

export const TOTAL_AUDIO = [
  {
    id: 1,
    name: '收购方在有限责任公司股权并购中的法律风险防控',
    src: defaultAudio,
  },
  {
    id: 2,
    name: '收购方在有限责任公司股权并购中的法律风险防控',
    src: defaultAudio,
  },
  {
    id: 3,
    name: '收购方在有限责任公司股权并购中的法律风险防控',
    src: defaultAudio,
  },
  {
    id: 4,
    name: '收购方在有限责任公司股权并购中的法律风险防控',
    src: defaultAudio,
  },
  {
    id: 5,
    name: '收购方在有限责任公司股权并购中的法律风险防控',
    src: defaultAudio,
  },
  {
    id: 6,
    name: '收购方在有限责任公司股权并购中的法律风险防控',
    src: defaultAudio,
  },
];

const OnlineStudy = () => {
  const handleToClass = (item) => {
    const { id } = item;
    Taro.navigateTo({ url: '/pages/ClassDetail/index?id=' + id });
  };

  return (
    <View className='onlineStudy-wrap'>
      <View className='hotClass-wrap'>
        <TitleCon title='全部课程' />
        <View className='at-row at-row--wrap hotClass-grid'>
          {TOTAL_CLASS.map((item) => {
            const { name, src } = item;
            return (
              <View className='at-col at-col-3 hotClass-item' key={name}>
                <Image style='height:40px' mode='heightFix' src={src} onClick={()=>handleToClass(item)}/>
                <View className='hotClass-tag-name'>{name}</View>
              </View>
            );
          })}
        </View>
      </View>
      <View className='audio-wrap'>
        <TitleCon title='音频专题' />
        <View className='at-row at-row--wrap audio-grid'>
          {TOTAL_AUDIO.map((item) => {
            const { name, src, id } = item;
            return (
              <View className='at-col at-col-6 audio-item' key={id}>
                <Image style='height:150px' mode='heightFix' src={src} onClick={() => handleToClass(item)} />
                <View className='audio-tag-name' onClick={() => handleToClass(item)}>
                  {name}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default OnlineStudy;
