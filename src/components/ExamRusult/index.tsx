import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';
import { AtButton } from 'taro-ui';

interface IProps {
  analysis: { [key: string]: any };
  questions: Array<any>;
  handleOver?: () => void;
}
const ResultWrap = (props: IProps) => {
  const { analysis, questions, handleOver } = props;
  return (
    <View className='exam-wrap'>
      <View className='result-con'>
        <View className='result-top'>
          {analysis.title || '-'}({analysis.totalscore || '-'}分)
        </View>
        <View className='result-mid'>
          {questions &&
            questions.map((item, index) => {
              // const [rightAnswer, analysis] = isString(item.analysis)?item.analysis.join('/n'):['',''];
              const answer = item.answers.map((i) => i.answer);
              const rightanswer = item.rightanswer.map((i) => i.answer);
              return (
                <View className='result-item' key={item.id}>
                  <View className='result-item-question'>
                    题目：{item.title}({item.score || '-'}分)
                  </View>
                  <View className={`result-item-top ${item.isright == '1' ? 'isRight' : 'isWrong'}`}>
                    <View className='answer-item'>选择：{answer.join() || '-'}</View>
                    <View className='answer-item'>正确答案：{rightanswer || '-'}</View>
                  </View>
                  <View className='result-item-min'>解析说明：{item.analysis || '-'}</View>
                </View>
              );
            })}
        </View>
        <View className='result-footer'>
          <View className='bottom-btn-con'>
            {handleOver && (
              <AtButton type='secondary' size='small' onClick={handleOver}>
                查看完毕
              </AtButton>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ResultWrap;
