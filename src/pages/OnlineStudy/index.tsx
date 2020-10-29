import Taro, { useDidShow, useEffect, useState } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import TitleCon from '@/components/TitleCon/index';
import { defaultAudio } from '@/static/images/index';
import { getCourseCatesearch, getCourseHotcourse } from './services';
import './index.scss';
import ClassTagGroup from '@/components/ClassTagGroup';

const OnlineStudy = () => {
  const [tagClass, setTagClass] = useState([]);
  const [niceClass, setNiceClass] = useState([]);
  const handleToClass = (item) => {
    const { id } = item;
    Taro.navigateTo({ url: '/pages/ClassDetail/index?cid=' + id });
  };
  useEffect(() => {
    getCourseCatesearch()
      .then((d) => {
        d.cates && setTagClass(d.cates);
      })
      .catch((e) => {
        console.log(e);
      });
    getCourseHotcourse({ count: 12 })
      .then((d) => {
        d.courses && setNiceClass(d.courses);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  Taro.setNavigationBarTitle({
    title: '在线培训',
  });
  useDidShow(() => {});
  return (
    <View className='onlineStudy-wrap'>
      <View className='hotClass-wrap'>
        {/* <TitleCon title='全部课程' /> */}
        <ClassTagGroup hotClass={tagClass} />
      </View>
      <View className='audio-wrap'>
        <TitleCon title='精品课程' />
        <View className='at-row at-row--wrap audio-grid'>
          {[...niceClass].map((item) => {
            const { cname, cover, id } = item;
            return (
              <View className='at-col at-col-6 audio-item' key={id}>
                <Image style='height:150px' mode='heightFix' src={cover} onClick={() => handleToClass(item)} />
                <View className='audio-tag-name' onClick={() => handleToClass(item)}>
                  {cname}
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
