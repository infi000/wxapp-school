import Taro, { useDidShow, useRouter, useState } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import './index.scss';
import { getExampaperdetail,getCanswer, getExamend} from './services';
import ExamBox from './modules/ExamBox';
import { AtButton, AtGrid, AtRadio } from 'taro-ui';
import { isString } from 'lodash';

const NewsDetail = () => {
  Taro.setNavigationBarTitle({
    title: '华鑫学堂',
  });
  const [answerList, setAnserList] = useState({}); // 用户答题列表 {id:{内容}}
  const [answerNum, setAnswerNum] = useState(0); // 当前答题位置
  const [showCheckInfo, setShowCheckInfo] = useState(false); // 是否查看说明
  const [examInfoList, setExamInfoList]: [any, any] = useState([]);

  const router = useRouter();
  const { params } = router;
  const { epid = '',examid = '' } = params || {};
  const handleAnswer = (item) => {
    const answer = isString(item.content)?item.content.substr(0,1):'';
    getCanswer({epid,examid,qid:item.qid,answer}).then(d =>{
      setAnserList((opt) => {
        return { ...opt, ...{ [item.qid]: item } };
      });
    })
  };
  const handleClickGrid = (item) => {
    const { type } = item;
    switch (type) {
      case 'last':
        setAnswerNum((num) => {
          if (num !== 0) {
            return num - 1;
          }
          return num;
        });
        setShowCheckInfo(false);
        break;
      case 'next':
        setAnswerNum((num) => {
          if (num < examInfoList.length - 1) {
            return num + 1;
          }
          return num;
        });
        setShowCheckInfo(false);
        break;
      case 'back':
        Taro.navigateTo({ url: '/pages/ExamClass/index'});
        break;
      case 'check':
        setShowCheckInfo((b) => !b);
        break;
    }
  };
  const handleExamEnd = () =>{
    getExamend({examid}).then(d=>{
      Taro.redirectTo({ url: '/pages/NewExamDetail/components/Result'});
    })
  }
  useDidShow(() => {
    getExampaperdetail({ epid })
      .then((d) => {
        setExamInfoList(d);
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return (
    <View className='exam-wrap'>
      <ExamBox
        handleAnswer={handleAnswer}
        info={examInfoList[answerNum]}
        showCheckInfo={showCheckInfo}
        totalAnswerNum={examInfoList.length}
        answerNum={answerNum}
        answerList={answerList}
        handleExamEnd={handleExamEnd}
      />
      <View className='exam-footer'>
        <AtGrid
          mode='square'
          hasBorder={false}
          columnNum={4}
          className='exam-grid'
          onClick={handleClickGrid}
          data={[
            {
              image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
              value: '返回学习',
              type: 'back',
            },
            {
              image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
              value: '查看说明',
              type: 'check',
            },
            {
              image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
              value: '上一题',
              type: 'last',
            },
            {
              image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
              value: '下一题',
              type: 'next',
            },
          ]}
        />
      </View>
    </View>
  );
};

export default NewsDetail;
