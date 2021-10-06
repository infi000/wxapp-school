import Taro, { useDidShow, useState,useRouter } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import ExamRusult from '@/components/ExamRusult'
import './index.scss';
import {getMydaypaperresult} from './services';
import { AtGrid } from 'taro-ui';
import { get } from 'lodash';
const defaultDataSource = {  questions: [], analysis: {} };

const TestResult = () => {
  const [dataSource, setDataSource] = useState({ ...defaultDataSource })
  Taro.setNavigationBarTitle({
    title: 'DI动力课堂',
  });
  const router = useRouter();
  const analysis: { [key: string]: string } = get(dataSource, ['analysis'], {});
  const questions: any[] = get(dataSource, ['questions'], []);

  useDidShow(() => {
    const { params } = router;
    const {} = params || {};
    getMydaypaperresult().then(d=>{
      setDataSource(d);
    }).catch(e =>{
      console.log(e);
    })
  });

  return (
    // <View className='basewrap testResult-wrap'>
    //  {answers.map(item=>{
    //      const { id,answer,ctime} = item;
    //      return <View key={id}>
    //          id:{id},答案:{answer},时间{ctime}
    //      </View>
    //  })}
    // </View>
    <ExamRusult questions={questions} analysis={analysis} />
  );
};

export default TestResult;
