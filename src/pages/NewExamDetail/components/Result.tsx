import Taro, { useDidShow, useState, useRouter } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import '../index.scss';
import {} from '../services';
import { AtButton, AtGrid } from 'taro-ui';

const getMyattcourse: any = () => {};
const Result = (props) => {
  const {nav, currentNavIndex} = useSelector(state => state.tabbar)
  const dispatch = useDispatch();
  const router = useRouter();
  const handleOver = () => {
    Taro.redirectTo({ url: '/pages/Main/index'});
  };
  useDidShow(() => {
    dispatch({type: 'tabbar/updateCurrentNavIndex', payload: 2})
    Taro.setNavigationBarTitle({
      title: '考试结果',
    });
  });
  
  return (
    <View className='exam-wrap'>
      <View className='result-con'>
        <View className='result-top'>考试科目名称</View>
        <View className='result-mid'>
          {[1, 2, 34, 5, 6, 7, 8, 9, 0, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4].map((item, index) => {
            return (
              <View className='result-item' key={index}>
                <View className='result-item-top'>
                  <View className='answer-item'>第一题：B</View>
                  <View className='answer-item'>正确答案：B</View>
                </View>
                <View className='result-item-min'>解析说明：112312321323123123</View>
              </View>
            );
          })}
        </View>
        <View className='result-footer'>
          <View className='bottom-btn-con'>
            <AtButton type='secondary' size='small' onClick={handleOver}>
              查看完毕
            </AtButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Result;
