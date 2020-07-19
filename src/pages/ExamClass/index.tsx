import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { TOTAL_CLASS } from '@/constants/index';
import TitleCon from '@/components/TitleCon';
import { AtModal } from 'taro-ui';
import './index.scss';

const { useState, useEffect } = Taro;

const ExamClass = () => {
  const [modal, setModal] = useState({
    show: false,
    data: {
      id: '',
    },
  });
  const handleToExam = (item) => {
    const { id } = item;
    setModal({
      show: true,
      data: {
        id,
      },
    });
  };
  const startExam = () => {
    const { data } = modal;
    const { id } = data;
    Taro.navigateTo({ url: '/pages/ExamDetail/index?id=' + id });
    resetModal();
  };
  const resetModal = () => {
    setModal({
      show: false,
      data: {
        id: '',
      },
    });
  };
  return (
    <View className='examClass-wrap'>
      <View className='examClass-wrap'>
        <TitleCon title='选择考试课程' />
        <View className='at-row at-row--wrap examClass-grid'>
          {TOTAL_CLASS.map((item) => {
            const { name, src } = item;
            return (
              <View className='at-col at-col-3 examClass-item' key={name}>
                <Image style='height:40px' mode='heightFix' src={src} onClick={() => handleToExam(item)} />
                <View className='examClass-tag-name'>{name}</View>
              </View>
            );
          })}
        </View>
      </View>
      <AtModal
        isOpened={modal.show}
        title='开始考试'
        cancelText='取消'
        confirmText='确认'
        onClose={resetModal}
        onCancel={resetModal}
        onConfirm={startExam}
      />
    </View>
  );
};

export default ExamClass;
