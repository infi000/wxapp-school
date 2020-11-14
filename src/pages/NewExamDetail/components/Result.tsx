import Taro, { useDidShow, useState, useRouter } from '@tarojs/taro';
import { View, Block, RichText } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import '../index.scss';
import {} from '../services';
import { AtButton, AtGrid } from 'taro-ui';
import { getExamend, getMyExamResult} from '../services';
import { get, isString } from 'lodash';
const defaultDataSource = {examid:'',questions:[],analysis:{}};

const Result = () => {
  const [ dataSource, setDataSource] = useState({...defaultDataSource})
  const dispatch = useDispatch();
  const router = useRouter();
  const examid = get(router,['params','examid'],''); 
  const epid = get(router, ['params','epid'],''); 
  const analysis: { [key: string]: string } = get(dataSource, ['analysis'], {});
  const questions: any[] = get(dataSource, ['questions'], []);

  const handleOver = () => {
    Taro.redirectTo({ url: '/pages/Main/index' });
  };
  useDidShow(() => {
    dispatch({ type: 'tabbar/updateCurrentNavIndex', payload: 2 });
    Taro.setNavigationBarTitle({
      title: '华鑫学堂',
    });
    getMyExamResult({ epid }).then(d=>{
      setDataSource(d);
    })
  });

  return (
    <View className='exam-wrap'>
      <View className='result-con'>
        <View className='result-top'>
          {analysis.title || '-'}({analysis.totalscore || '-'}分)
        </View>
        <View className='result-mid'>
          {questions.map((item, index) => {
            // const [rightAnswer, analysis] = isString(item.analysis)?item.analysis.join('/n'):['',''];
            const answer = item.answers.map(i => i.answer);
            return (
              <View className='result-item' key={item.id}>
                <View className={`result-item-top ${item.isright == '1' ? 'isRight' : 'isWrong'}`}>
                  <View className='answer-item'>
                    第{index + 1}题({item.score || '-'}分)：{answer.join() || '-'}
                  </View>
                  <View className='answer-item'>正确答案：{item.rightanswer|| '-'}</View>
                </View>
                <View className='result-item-min'>解析说明：{item.analysis|| '-'}</View>
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
