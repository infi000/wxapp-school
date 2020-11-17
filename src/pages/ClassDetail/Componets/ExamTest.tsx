import Taro, { useDidShow, useState, useRouter, useMemo } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import '../index.scss';
import { get, isArray } from 'lodash';
import { AtButton, AtModal } from 'taro-ui';
import { getExampaper, getExamstart } from '../services';
import TitleCon from '@/components/TitleCon';

const ExamTest = (props) => {
  const { info = {} } = props;
  const [exam, setExam] = useState([]);
  const [modal, setModal]: [any, any] = useState({
    show: false,
    data: {},
  });
  const router = useRouter();
  const { params } = router;
  const { cwid, cid, eptype }: any = params || {};
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
      Taro.navigateTo({ url: '/pages/NewExamDetail/index?epid=' + id + '&examid=' + examid + '&eptype=' + eptype });
    });
  };
  const resetModal = () => {
    setModal({
      show: false,
      data: {},
    });
  };
  useDidShow(() => {
    let title = '';
    if (eptype === '1') {
      title = '考试';
    } else if (eptype === '2') {
      title = '随堂测验';
    } else if (eptype === '3') {
      title = '每日一测';
    }
    Taro.setNavigationBarTitle({
      title: '华鑫学堂',
    });
    let params: any = { eptype };
    if (cwid) {
      params.cwid = cwid;
    }
    if (cid) {
      params.cid = cid;
    }
    getExampaper(params)
      // getExampaper({ cwid:'1',eptype:'1' })
      .then((d) => {
        d.papers && setExam(d.papers);
      })
      .catch((e) => {
        console.log(e);
      });
  });
  const tag_name = eptype==='1'?'考试':'测验';
  return (
    <View className='basewrap'>
      <View className='examClass-wrap'>
        <TitleCon title={`选择${tag_name}`} />
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
                  {`进入${tag_name}`}
                </View>
              </View>
            );
          })}
        </View>
        <AtModal
          isOpened={modal.show}
          title={`开始${tag_name}`}
          cancelText='取消'
          confirmText='确认'
          onClose={resetModal}
          onCancel={resetModal}
          onConfirm={startExam}
        />
      </View>
    </View>
  );
};

export default ExamTest;
