import Taro, { useEffect, useState } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import TitleCon from '@/components/TitleCon/index';
import { TOTAL_CLASS } from '@/constants/index';
import { defaultAudio } from '@/static/images/index';
import { getCourseCatesearch } from './services';
import './index.scss';
import ClassTagGroup from '@/components/ClassTagGroup';

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
  const [hotClass, setHotClass] = useState([]);
  const handleToClass = (item) => {
    const { id } = item;
    Taro.navigateTo({ url: '/pages/ClassDetail/index?id=' + id });
  };
  useEffect(() => {
    getCourseCatesearch().then(d=>{
      d.cates && setHotClass(d.cates);
    }).catch(e =>{
      console.log(e);
    })
  },[]);
  Taro.setNavigationBarTitle({
    title: '在线培训',
  });
  return (
    <View className='onlineStudy-wrap'>
      <View className='hotClass-wrap'>
        <TitleCon title='全部课程' />
        <ClassTagGroup hotClass={hotClass} />
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
