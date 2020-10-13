import Taro, { useDidShow, useRouter } from '@tarojs/taro';
import { AtAvatar, AtTag, AtTabs, AtTabsPane, AtButton } from 'taro-ui';
import { View, Block, Image } from '@tarojs/components';
import TitleCon from '@/components/TitleCon';
import ClassImg from './Componets/ClassImg';
import { getCourseDetail, addCourseAttcourse, courseWareLearn } from './services';
import { showSuccessToast } from '@/utils/util';
import './index.scss';
import { get, isArray } from 'lodash';
import { CWTYPE_MAP } from './canstants';
const { useState, useEffect } = Taro;
const tabList = [{ title: '课程介绍' }, { title: '课程大纲' }];

const ClassDetail = () => {
  const [classDetail, setClassDetail]: [any, any] = useState({});
  const [modalClassImg, setModalClassImg]: [any, any] = useState({ show: false, data: {} });
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0);
  const handleToClassPlay = (params) => {
    const { cwtype, files, id, cwname } = params;
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
      setModalClassImg({
        show: true,
        data: params,
      });
    }
  };
  const handleAddCourseAttcourse = (cid) => {
    addCourseAttcourse({ cid }).then((d) => {
      showSuccessToast(d);
    });
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
      {modalClassImg.show ? (
        <ClassImg info={modalClassImg.data} handleBack={() => setModalClassImg({ show: false, data: {} })} />
      ) : (
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
                    <AtButton
                      type='primary'
                      size='small'
                      className='at-button-mini'
                      onClick={() => handleAddCourseAttcourse(classDetail.id)}
                    >
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
                  {get(classDetail, ['sourceware'], []).map((item) => {
                    return (
                      <View className='at-row class-item' key={item}>
                        <View className='at-col at-col-2'>
                          <AtTag size='small'>{CWTYPE_MAP[item.cwtype]}</AtTag>
                        </View>
                        <View className='at-col at-col-8  class-item-desc'>{item.cwname}</View>
                        <View className='at-col at-col-2'>
                          <AtButton type='primary' size='small' className='at-button-mini' onClick={() => handleToClassPlay(item)}>
                            学习
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
                <View className='classInfo-class-name'>《 {get(classDetail, ['cname'], '暂无')}》</View>
                <View className='classInfo-class-desc'>{get(classDetail, ['cdes'], '暂无')}</View>
              </AtTabsPane>
            </AtTabs>
          </View>
        </Block>
      )}
    </View>
  );
};

export default ClassDetail;
