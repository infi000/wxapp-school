//每日小测
import Taro, { useDidShow } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { TOTAL_CLASS } from '@/constants/index';
import TitleCon from '@/components/TitleCon';
import { AtModal } from 'taro-ui';
import { getExampaper, getExamstart, getDaypaper } from './services';
import './index.scss';

const { useState, useEffect } = Taro;

const TestClass = () => {
  Taro.setNavigationBarTitle({
    title: 'DI动力课堂',
  });
  const [exam, setExam] = useState([]);
  const [modal, setModal]: [any, any] = useState({
    show: false,
    data: {},
  });
  const handleToExam = (item) => {
    setModal({
      show: true,
      data: item,
    });
  };
  const startExam = () => {
    const { data } = modal;
    const { id } = data;
    getExamstart({ epid: id }).then((d) => {
      resetModal();
      const { examid } = d || {};
      Taro.navigateTo({ url: '/pages/NewExamDetail/index?epid=' + id + '&examid=' + examid + '&eptype=3' });
    });
  };
  const resetModal = () => {
    setModal({
      show: false,
      data: {},
    });
  };
  useDidShow(() => {
    getDaypaper()
      .then((d) => {
        setExam(d.papers);
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return (
    <View className='examClass-wrap'>
      <View>
        <TitleCon title='选择小测' />
        <View className='examClass-grid'>
          {exam.map((item) => {
            const { title, paperdes, id, passscore, score, starttime, endtime, qcount } = item;
            return (
              <View className='at-row  at-row--wrap examClass-item' key={id}>
                <View className='at-col at-col-12 examClass-tag-desc'>
                  <View className='examClass-tag-name'>名称：</View>
                  {title}
                </View>
                <View className='at-col at-col-12 examClass-tag-desc'>
                  <View className='examClass-tag-name'>描述：</View>
                  {paperdes}
                </View>
                <View className='at-col at-col-12 examClass-tag-desc'>
                  <View className='examClass-tag-name'>时间：</View>
                  {starttime}～{endtime}
                </View>
                <View className='at-col at-col-4 examClass-tag-desc'>
                  <View className='examClass-tag-name'>总分：</View>
                  {score}
                </View>
                <View className='at-col at-col-4 examClass-tag-desc'>
                  <View className='examClass-tag-name'>及格分：</View>
                  {passscore}
                </View>
                <View className='at-col at-col-4 examClass-tag-desc'>
                  <View className='examClass-tag-name'>题量：</View>
                  {qcount}
                </View>
                <View className='at-col at-col-12 examClass-item-btn' onClick={() => handleToExam(item)}>
                  进入测验
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <AtModal
        isOpened={modal.show}
        title='开始测验'
        cancelText='取消'
        confirmText='确认'
        onClose={resetModal}
        onCancel={resetModal}
        onConfirm={startExam}
      />
    </View>
  );
};

export default TestClass;
