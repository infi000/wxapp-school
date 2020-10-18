import Taro, { useDidShow, useRouter, useState } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import '../index.scss';
import { isArray } from 'lodash';
import { AtButton } from 'taro-ui';

const defaultInfo = {
  qttitle: '',
  title: '',
  analysis: '',
  content: [],
};
interface IProps {
  info: {
    qttitle: string;
    title: string;
    analysis: string;
    content: Array<{ content: string; id: string; qid: string }>;
  };
  handleAnswer: (params: any) => void;
  handleExamEnd: () => void;
  showCheckInfo: boolean;
  answerNum: number;
  totalAnswerNum: number;
  answerList: object;
}
const ExamBox = (props: IProps) => {
  const { info = defaultInfo, handleAnswer,handleExamEnd, showCheckInfo, answerNum, totalAnswerNum, answerList } = props;
  return (
    <View className='exam-con'>
      <View className='con-top'>
        <View className='top-left'>{info.qttitle}</View>
        <View className='top-right'>
          {`${answerNum + 1}`}/{totalAnswerNum}
        </View>
      </View>
      <View className='con-mid'>
        <View className='mid-textArea'>{info.title}</View>
        <View className='mid-opt'>
          {info.content &&
            isArray(info.content) &&
            info.content.map((item) => {
              const { id, qid } = item;
              let cssName = '';
              if (answerList[qid] && answerList[qid]['id'] === id) {
                cssName = 'choosedAnswer';
              }
              return (
                <View
                  className='mid-opt-con'
                  key={item.id}
                  onClick={() => {
                    handleAnswer(item);
                  }}
                >
                  {/* <View className='mid-label'>{cssName}：</View> */}
                  <View className={`mid-desc ${cssName}`}>{item.content}</View>
                </View>
              );
            })}
        </View>
        <View className='mid-answer'>
          {/* <View>
              正确答案： <View className='mid-label'>A</View>
            </View> */}
          {showCheckInfo && (
            <View>
              解析说明： <View className='mid-desc'>{info.analysis}</View>
            </View>
          )}
        </View>
      </View>
      <View className='con-bottom'>
        <View className='bottom-btn-con'>
          {answerNum + 1 === totalAnswerNum && (
            <AtButton type='secondary' size='small' onClick={handleExamEnd}>
              提交
            </AtButton>
          )}
        </View>
      </View>
    </View>
  );
};

export default ExamBox;
