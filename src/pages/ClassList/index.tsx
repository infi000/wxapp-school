import Taro, { useDidShow, useEffect, useRouter, useState } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import TitleCon from '@/components/TitleCon/index';
import { coursesearch } from './services';
import './index.scss';
import { ctype1, ctype2, ctype3 } from '@/static/images/index';
import { AtDivider } from 'taro-ui'
import { useIspass } from '@/utils/hooks';

const IMGAGE_TAG = ['',ctype1,ctype2, ctype3];
const ClassList = () => {
  const router = useRouter();
  const checktPass = useIspass();
  const { params } = router;
  const { cid = '', title = '精品课程' } = params || {};
  const [niceClass, setNiceClass] = useState([]);
  
  const handleToClass = (item) => {
    const { id, ctype } = item;
    checktPass(ctype,()=>{
      Taro.navigateTo({ url: '/pages/ClassDetail/index?cid=' + id });
    })
  };
  useDidShow(() => {

    coursesearch({cid})
      .then((d) => {
        d.courses && setNiceClass(d.courses || []);
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
      <View className='audio-wrap'>
        <TitleCon title={title} />
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
          {niceClass.length === 0 && <AtDivider content='暂无' /> }
        </View>
      </View>
    </View>
  );
};

export default ClassList;
