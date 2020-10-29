import Taro, { useDidShow, useState,useRouter } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import './index.scss';
import {getMydaypaperresult} from './services';
import { AtGrid } from 'taro-ui';

const TestResult = (props) => {
  Taro.setNavigationBarTitle({
    title: '小测结果',
  });
  const [answers, setAnswers] = useState([]);
  const router = useRouter();


  useDidShow(() => {
    const { params } = router;
    const {} = params || {};
    getMydaypaperresult().then(d=>{
      d.answers && setAnswers(d.answers);
    }).catch(e =>{
      console.log(e);
    })
  });

  return (
    <View className='basewrap testResult-wrap'>
     {answers.map(item=>{
         const { id,answer,ctime} = item;
         return <View key={id}>
             id:{id},答案:{answer},时间{ctime}
         </View>
     })}
    </View>
  );
};

export default TestResult;
