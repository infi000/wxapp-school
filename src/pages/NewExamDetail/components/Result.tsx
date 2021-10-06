import Taro, { useDidShow, useState, useRouter } from '@tarojs/taro';
import { View, Block, RichText } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import ExamRusult from '@/components/ExamRusult'
import '../index.scss';
import {} from '../services';
import { AtButton, AtGrid } from 'taro-ui';
import { getExamend, getMyExamResult} from '../services';
import { get, isString } from 'lodash';
import {res} from './mock';
const defaultDataSource = {examid:'',questions:[],analysis:{}};
// const defaultDataSource = res;

const Result = () => {
  const [ dataSource, setDataSource] = useState({...defaultDataSource})
  const dispatch = useDispatch();
  const router = useRouter();
  const epid = get(router, ['params','epid'],''); 
  const analysis: { [key: string]: string } = get(dataSource, ['analysis'], {});
  const questions: any[] = get(dataSource, ['questions'], []);

  const handleOver = () => {
    Taro.redirectTo({ url: '/pages/Main/index' });
  };
  useDidShow(() => {
    dispatch({ type: 'tabbar/updateCurrentNavIndex', payload: 2 });
    Taro.setNavigationBarTitle({
      title: 'DI动力课堂',
    });
    getMyExamResult({ epid }).then(d=>{
      setDataSource(d);
    })
  });

  return (
    <ExamRusult analysis={analysis} questions={questions} handleOver={handleOver}  />
  );
};

export default Result;
