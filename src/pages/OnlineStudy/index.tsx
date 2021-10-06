import Taro, { useDidShow, useEffect, useState } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import TitleCon from '@/components/TitleCon/index';
import { getCourseCatesearch, getCourseHotcourse } from './services';
import './index.scss';
import ClassTagGroup from '@/components/ClassTagGroup';
import { ctype1, ctype2, ctype3 } from '@/static/images/index';
import { useIspass } from '@/utils/hooks';

const IMGAGE_TAG = ['',ctype1,ctype2, ctype3];
const OnlineStudy = () => {
  const [tagClass, setTagClass] = useState([]);
  const [niceClass, setNiceClass] = useState([]);
  const checktPass = useIspass();
  const handleToClass = (item) => {
    const { id, ctype } = item;
    checktPass(ctype,()=>{
      Taro.navigateTo({ url: '/pages/ClassDetail/index?cid=' + id });
    })
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
    title:'DI动力课堂',
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
            const { cname, cover, id, ctype } = item;
            return (
              <View className='at-col at-col-6 audio-item' key={id}>
                <View className='hotClass-image-wrap'>
                  <Image style='width: 100%;height: 100%;' mode='aspectFill' src={cover} onClick={() => handleToClass(item)} />
                  {ctype && <Image style='height:30px' mode='heightFix' className='hotClass-image-tag' src={IMGAGE_TAG[ctype]} />}
                </View>
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
