import Taro, { useDidShow } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import TitleCon from '@/components/TitleCon';
import ClassTagGroup from '@/components/ClassTagGroup';
import '../index.scss';
import { getCourseCatesearch } from '../services';
import { tkjf } from '@/static/images/index';
import { isArray } from 'lodash';


const { useState, useEffect, useMemo } = Taro;

const HotClass = () => {
  // const { hotClass } = useSelector((state:any) => state.IndustryNews);
  const [hotClass, setHotClass] = useState([]);
  useEffect(() => {
    getCourseCatesearch().then(d=>{
      d.cates && setHotClass(d.cates);
    }).catch(e =>{
      console.log(e);
    })
  },[]);
  const memoHotClass = useMemo(()=>{
    const res = isArray(hotClass) && hotClass.length>0 ? [...hotClass].splice(0,8) : [];
    return res
  },[hotClass])
  return (
    <View className='hotClass-wrap'>
      <TitleCon title='热门课程' />
      <ClassTagGroup hotClass={memoHotClass} col='4'/>
    </View>
  );
};

export default HotClass;
