import Taro, { useDidShow, useEffect } from '@tarojs/taro';
import { View, Checkbox, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtList, AtListItem } from 'taro-ui';
import './index.scss';
import { isArray } from 'lodash';
import { SCORE_TYPE } from '@/constants/index';
import { getUserMyScore } from './services';
import { useShare } from '@/utils/hooks';

const { useState, useEffect } = Taro;

const MyScore = () => {
  const [myScores, setMyScores] = useState([]);

  Taro.setNavigationBarTitle({
    title: 'DI动力课堂',
  });

  useDidShow(() => {
    getUserMyScore().then(d => {
      d.scores && setMyScores(d.scores);
    }).catch(e => {
      console.log(e);
    })
  });
  useShare();
  return (
    <View className='myScore-wrap'>
      {
        isArray(myScores) && myScores.map((item) => {
          const { cname, score, stype, citme } = item;
          return <View className='myScore-item'>
            <View className='myScore-item-title'>{cname}</View>
            <View>{score}分/{SCORE_TYPE[stype]}</View>
            <View>{citme}</View>
          </View>
        })
      }
    </View>
  );
};

export default MyScore;
