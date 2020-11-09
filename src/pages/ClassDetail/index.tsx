import Taro, { useDidShow, useRouter } from '@tarojs/taro';
import { AtAvatar, AtTag, AtTabs, AtTabsPane, AtButton, AtActionSheet, AtActionSheetItem } from 'taro-ui';
import { View, Block, Image } from '@tarojs/components';
import TitleCon from '@/components/TitleCon';
import ClassImg from './Componets/ClassImg';
import { getCourseDetail, addCourseAttcourse, courseWareLearn, getExamstart } from './services';
import { showSuccessToast } from '@/utils/util';
import './index.scss';
import { get, isArray } from 'lodash';
import { CWTYPE_MAP } from './canstants';
const { useState, useEffect } = Taro;
const tabList = [{ title: '课程大纲' }, { title: '课程介绍' }];

const ClassDetail = () => {
  const [classDetail, setClassDetail]: [any, any] = useState({});
  const [actionSheet, setActionSheet]: [any, any] = useState({ show: false, data: {} });
  const [classActionSheet, setClassActionSheet]: [any, any] = useState({ show: false, data: {} });
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0);
  const handleToClassPlay = () => {
    const { cwtype, files, id, cwname } = actionSheet.data;
    setActionSheet({ show: false, data: {} });
    setClassActionSheet({ show: false, data: {} });
    courseWareLearn({ cwid: id, cid: classDetail.id });
    if (cwtype == 1 || cwtype == 3) {
      Taro.navigateTo({ url: `/pages/ClassPlay/index?cwid=${files[0].cwid}&fpath=${files[0].fpath}&id=${files[0].id}&cwname=${cwname}` });
      return;
    }
    if (cwtype == 4) {
      Taro.downloadFile({
        url: files[0].fpath,
        success(res) {
          const filePath = res.tempFilePath;
          console.log(filePath);
          Taro.openDocument({
            filePath,
            success(res) {
              console.log('打开文档成功');
            },
          });
        },
      });
      return;
    }
    if (cwtype == 2) {
      const info = encodeURIComponent(JSON.stringify(actionSheet.data));
      console.log(info);
      Taro.navigateTo({ url: `/pages/ClassDetail/Componets/ClassImg?info=${info}` });
      return;
    }
  };
  const handleToExam = (etype) => {
    const { id } = actionSheet.data;
    setActionSheet({ show: false, data: {} });
    Taro.navigateTo({ url: `/pages/ClassDetail/Componets/ExamTest?cwid=${id}&eptype=${etype}` });
  };
  const handleClassToExam = (etype) => {
    const { id } = classActionSheet.data;
    setClassActionSheet({ show: false, data: {} });
    Taro.navigateTo({ url: `/pages/ClassDetail/Componets/ExamTest?cid=${id}&eptype=${etype}` });
  };
  const handleAddCourseAttcourse = (cid) => {
    addCourseAttcourse({ cid }).then((d) => {
      showSuccessToast(d);
    });
  };
  const handleActionClass = () => {
    const id = get(classDetail, ['id'], '');
    const cname = get(classDetail, ['cname'], '');
    setClassActionSheet({ show: true, data: { id, cname } });
    console.log('classDetail', classDetail);
  };
  useDidShow(() => {
    const { params } = router;
    const { cid = '' } = params || {};
    getCourseDetail({ cid })
      .then((d) => {
        setClassDetail(d);
        Taro.setNavigationBarTitle({
          title: d.cname || '',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <View className='classDetail-wrap'>
      <Block>
        <View className='teacherInfo-wrap'>
          <TitleCon title='讲师介绍' />
          <View className='at-row'>
            <View className='at-col at-col-1 at-col--auto'>
              <View className='head-con'>
                <AtAvatar size='large' circle image={get(classDetail, ['teacher', 'cover'], '')}></AtAvatar>
              </View>
            </View>
            <View className='at-col'>
              <View className='teacherInfo-top'>
                {get(classDetail, ['teacher', 'tname'], '暂无')}
                <View className='tag-con'>
                  <AtButton type='primary' size='small' className='at-button-mini' onClick={() => handleAddCourseAttcourse(classDetail.id)}>
                    订阅
                  </AtButton>
                </View>
              </View>
              <View className='teacherInfo-mid'>{get(classDetail, ['teacher', 'tdes'], '暂无')}</View>
            </View>
          </View>
        </View>
        <View className='classInfo-wrap'>
          <AtTabs current={currentTab} tabList={tabList} onClick={setCurrentTab}>
            <AtTabsPane current={currentTab} index={0}>
              <View className='class-con'>
                <View className='at-row class-item'>
                  <View className='at-col at-col-2'>
                    <AtTag size='small'>主课程</AtTag>
                  </View>
                  <View className='at-col at-col-8  class-item-desc'>《{get(classDetail, ['cname'], '暂无')}》</View>
                  <View className='at-col at-col-2'>
                    <AtButton type='primary' size='small' className='at-button-mini' onClick={handleActionClass}>
                      操作
                    </AtButton>
                  </View>
                </View>
                {get(classDetail, ['sourceware'], []).map((item) => {
                  return (
                    <View className='at-row class-item' key={item.cwname}>
                      <View className='at-col at-col-2'>
                        <AtTag size='small'>{CWTYPE_MAP[item.cwtype]}</AtTag>
                      </View>
                      <View className='at-col at-col-8  class-item-desc'>{item.cwname}</View>
                      <View className='at-col at-col-2'>
                        <AtButton
                          type='primary'
                          size='small'
                          className='at-button-mini'
                          onClick={() => setActionSheet({ show: true, data: item })}
                        >
                          操作
                        </AtButton>
                      </View>
                    </View>
                  );
                })}
              </View>
            </AtTabsPane>
            <AtTabsPane current={currentTab} index={1}>
              <View style='padding:10px;text-align: center;'>
                <Image mode='widthFix' style='width: 100%;' src={get(classDetail, ['cover'], '')} />
              </View>
              <View className='classInfo-class-name'>《{get(classDetail, ['cname'], '暂无')}》</View>
              <View className='classInfo-class-desc'>{get(classDetail, ['cdes'], '暂无')}</View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </Block>
      <AtActionSheet
        isOpened={actionSheet.show}
        title={actionSheet.data ? actionSheet.data.cwname : '请选择'}
        cancelText='取消'
        onCancel={() => setActionSheet({ show: false, data: {} })}
        onClose={() => setActionSheet({ show: false, data: {} })}
      >
        <AtActionSheetItem onClick={handleToClassPlay}>学习</AtActionSheetItem>
        <AtActionSheetItem onClick={() => handleToExam('3')}>每日一测</AtActionSheetItem>
        <AtActionSheetItem onClick={() => handleToExam('2')}>随堂测验</AtActionSheetItem>
        <AtActionSheetItem onClick={() => handleToExam('1')}>考试</AtActionSheetItem>
      </AtActionSheet>
      <AtActionSheet
        isOpened={classActionSheet.show}
        title={classActionSheet.data ? classActionSheet.data.cwname : '请选择'}
        cancelText='取消'
        onCancel={() => setClassActionSheet({ show: false, data: {} })}
        onClose={() => setClassActionSheet({ show: false, data: {} })}
      >
        <AtActionSheetItem onClick={() => handleClassToExam('3')}>每日一测</AtActionSheetItem>
        <AtActionSheetItem onClick={() => handleClassToExam('2')}>随堂测验</AtActionSheetItem>
        <AtActionSheetItem onClick={() => handleClassToExam('1')}>考试</AtActionSheetItem>
      </AtActionSheet>
    </View>
  );
};

export default ClassDetail;
