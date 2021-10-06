import Taro, { useDidShow, useRouter } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { AtRadio, AtButton, AtModal, AtToast } from 'taro-ui';
import { getExampaperdetail } from './services';
import './index.scss';
import { isArray } from 'lodash';

const { useState, useEffect } = Taro;

const examInfoList = [
  {
    id: 1,
    desc: '咀嚼练习中，张口咀嚼与闭口咀嚼结合进行，舌头应该（    ）',
    choose: [
      { value: 'A', desc: '微微卷起' },
      { value: 'B', desc: '坚持平铺' },
      { value: 'C', desc: '自然放平' },
      { value: 'D', desc: '随意放置' },
    ],
  },
  {
    id: 2,
    desc: '胸腹联合呼吸法中，吸气后两肋扩大，横膈膜应该(    )',
    choose: [
      { value: 'A', desc: '下降' },
      { value: 'B', desc: '上升' },
      { value: 'C', desc: '平稳' },
      { value: 'D', desc: '收缩' },
    ],
  },
  {
    id: 3,
    desc: '培训师在上课的时候可以佩戴(    )',
    choose: [
      { value: 'A', desc: '帽子' },
      { value: 'B', desc: '墨镜' },
      { value: 'C', desc: '手表' },
      { value: 'D', desc: '手套' },
    ],
  },
  {
    id: 4,
    desc: '培训师与听众链接中，首先要考虑听众的特点，听众喜欢(    )',
    choose: [
      { value: 'A', desc: '物质交流，听众要刺激' },
      { value: 'B', desc: '信息交流，学习最关键' },
      { value: 'C', desc: '思想交流，同频是重点' },
      { value: 'D', desc: '情感交流，快乐最重要' },
    ],
  },
  {
    id: 5,
    desc: '有一种互动的作用能做到：促动、启发，积极响应； 包容、沟通，共生智慧； 氛围热烈而和谐； 迅速了解学员。这种互动方式叫 (    )',
    choose: [
      { value: 'A', desc: '游戏' },
      { value: 'B', desc: '讨论' },
      { value: 'C', desc: '赞美' },
      { value: 'D', desc: '分队竞争' },
    ],
  },
  {
    id: 6,
    desc: '培训师气场的培养，其中控场的利器是(   )',
    choose: [
      { value: 'A', desc: '眼法' },
      { value: 'B', desc: '手法' },
      { value: 'C', desc: '步法' },
      { value: 'D', desc: '身法' },
    ],
  },
];

const ExamDetail = () => {
  Taro.setNavigationBarTitle({
    title: 'DI动力课堂',
  });
  const router = useRouter();
  // const [examInfoList, setExamInfoList]:[any,any] = useState([]);
  const [answerList, setAnswerList]: [Array<string>, Function] = useState([]);
  const [modal, setModal]: [{ show: boolean; data: { desc: string; status: 'submite' | 'back' } }, Function] = useState({
    show: false,
    data: {
      desc: '',
      status: 'submite',
    },
  });
  const [toast, setToast] = useState(false);
  const handleChooseAnswer = (value, index: number) => {
    setAnswerList((arr) => {
      if (isArray(arr)) {
        arr[index] = value;
        return [...arr];
      }
    });
  };
  const handleSubmit = () => {
    setModal({
      show: true,
      data: { desc: '确认提交答案？', status: 'submite' },
    });
  };
  const handleBack = () => {
    setModal({
      show: true,
      data: { desc: '确认返回？', status: 'back' },
    });
  };
  const handleConfirm = () => {
    const { data } = modal;
    const { status } = data;
    if (status == 'back') {
      Taro.navigateBack({
        delta: 1,
      });
    } else {
      setToast(true);
      Taro.navigateBack({
        delta: 1,
      });
    }
  };
  const resetModalToast = () => {
    setModal({ show: false, data: { desc: '', status: 'submite' } });
    setToast(false);
  };
  useDidShow(() => {
    const { params } = router;
    const { epid = '1' } = params || {};
    getExampaperdetail({ epid: 1 })
      .then((d) => {
        // setExamInfoList(d.courses);
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return (
    <View className='examDetail-wrap'>
      {examInfoList.map((item, index: number) => {
        const { id, desc, choose } = item;
        const options = choose.map((opt) => {
          const { value, desc: answerDesc } = opt;
          return { label: `${value}.${answerDesc}`, value };
        });
        return (
          <View className='exam-item' key={id}>
            <View className='question-con'>
              {id}.{desc}
            </View>
            <View className='answer-con'>
              <AtRadio
                options={options}
                value={answerList[index]}
                onClick={(value) => {
                  handleChooseAnswer(value, index);
                }}
              />
            </View>
          </View>
        );
      })}
      <View className='footer-con'>
        <AtButton type='primary' size='small' onClick={handleSubmit}>
          提交
        </AtButton>
        <View style={{ height: '20px' }}></View>
        <AtButton size='small' onClick={handleBack}>
          返回
        </AtButton>
      </View>
      <AtModal
        isOpened={modal.show}
        title='标题'
        cancelText='取消'
        confirmText='确认'
        onCancel={resetModalToast}
        onConfirm={handleConfirm}
        onClose={resetModalToast}
        content={modal.data.desc}
      />
      <AtToast isOpened={toast} text='提交成功'></AtToast>
    </View>
  );
};

export default ExamDetail;
