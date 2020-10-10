import Taro, { useRouter } from '@tarojs/taro';
import { AtAvatar, AtTag, AtTabs, AtTabsPane, AtButton } from 'taro-ui';
import { View, Block, Image } from '@tarojs/components';
import TitleCon from '@/components/TitleCon';
import { getCourseDetail } from './services';
import { daoshitouxiang } from '@/static/images/index'

import './index.scss';
import { get, isArray } from 'lodash';
const { useState, useEffect } = Taro;

const ClassDetail = () => {
  const tabList = [{ title: '课程介绍' }, { title: '课程大纲' }];
  const [classDetail, setClassDetail]: [any, any] = useState({});
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0);
  const handleToClassPlay = (id,cwtype) => {
    Taro.downloadFile({
      // e.target.dataset.name 是文件的地址
      url: 'http://127.0.0.1:8080/WMS.pptx',
      success(res) {
        const filePath = res.tempFilePath;
        console.log(filePath)
        Taro.openDocument({
          filePath,
          success(res) {
            console.log('打开文档成功')
          }
        })
      }
    })
    // Taro.navigateTo({ url: '/pages/ClassPlay/index?id=' + id });
  };
  useEffect(() => {
    const { params } = router;
    const { cid } = params || {};
    getCourseDetail({ cid })
      .then((d) => {
        setClassDetail(d);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View className='classDetail-wrap'>
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
                <AtButton type='primary' size='small' className='at-button-mini' onClick={() =>handleToClassPlay(item.id,item.cwtype)}>
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
              {isArray(classDetail.sourceware) && classDetail.sourceware.map((item) => {
                return (
                  <View className='at-row class-item' key={item}>
                    <View className='at-col at-col-2'>
                      <AtTag size='small'>音频</AtTag>
                    </View>
                    <View className='at-col at-col-8  class-item-desc'>{item.cwname}</View>
                    <View className='at-col at-col-2'>
                      <AtButton type='primary' size='small' className='at-button-mini' onClick={() =>handleToClassPlay(item.id,item.cwtype)}>
                        试听
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
    </View>
  );
};

export default ClassDetail;
