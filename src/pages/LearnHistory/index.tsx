import Taro, { useDidShow, useState, useRouter } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { getLearnhistory } from './services';
import './index.scss';
import { isArray } from 'lodash';

const LearnHistory = (props) => {
  Taro.setNavigationBarTitle({
    title: '华鑫学堂',
  });
  const [learnHistory, setLearnHistory] = useState([]);
  const router = useRouter();

  useDidShow(() => {
    const { params } = router;
    // const { cid = 1 } = params || {};
    getLearnhistory().then((d) => {
     d.study && setLearnHistory(d.study);
    });
  });

  return (
    <View className='basewrap learnHistory-wrap'>
      <View className='learn-item-wrap'>
        {isArray(learnHistory) &&
          learnHistory.map((item: any) => {
            return (
              <View className='learn-item' key={item.cid}>
                <View className='learn-item-line'>名称：{item.cwname}</View>
                <View className='learn-item-line'>学习时间：{item.studytime}</View>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default LearnHistory;
