import Taro from '@tarojs/taro';
import { AtAvatar, AtTag, AtTabs, AtTabsPane, AtButton } from 'taro-ui';
import { View, Block } from '@tarojs/components';
import TitleCon from '@/components/TitleCon';
import { daoshitouxiang } from '@/static/images/index'

import './index.scss';
const { useState, useEffect } = Taro;

const ClassDetail = () => {
  const tabList = [{ title: '课程介绍' }, { title: '课程大纲' }];
  const [currentTab, setCurrentTab] = useState(0);
  const handleToClassPlay = (id) => {
    Taro.navigateTo({ url: '/pages/ClassPlay/index?id=' + id });
  }
  return (
    <View className='classDetail-wrap'>
      <View className='teacherInfo-wrap'>
        <TitleCon title='讲师介绍' />
        <View className='at-row'>
          <View className='at-col at-col-1 at-col--auto'>
            <View className='head-con'>
              <AtAvatar size='large' circle image={ daoshitouxiang }></AtAvatar>
            </View>
          </View>
          <View className='at-col'>
            <View className='teacherInfo-top'>
              胡光辉
              <View className='tag-con'>
                <AtButton type='primary' size='small' className='at-button-mini'>
                  订阅
                </AtButton>
              </View>
            </View>
            <View className='teacherInfo-mid'>
              高级讲师：胡光辉 CCIE#17022（RS/ISP/DC）。2006年加入WOLF，8年思科培训教学经验，历任CCNA、CCNP、ISP与DC讲师，现任职于上海WOLF-LAB主讲运营商和数据中心方向的CCIE课程。在BGP、QOS、Multicast、MPLS/VPN、存储FC协议、VPC等技术领域有深入研究。以“知其然，知其所以然”为授课宗旨。
            </View>
          </View>
        </View>
      </View>
      <View className='classInfo-wrap'>
        <AtTabs current={currentTab} tabList={tabList} onClick={setCurrentTab}>
          <AtTabsPane current={currentTab} index={0}>
            <View className='class-con'>
              {
                [1,2,3,4].map((item) => {
                  return    <View className='at-row class-item' key={item}>
                  <View className='at-col at-col-2'>
                    <AtTag size='small'>音频</AtTag>
                  </View>
                  <View className='at-col at-col-8  class-item-desc'>危机公关经验为0的法律人，如何处理危机并升职加薪（上）</View>
                  <View className='at-col at-col-2'>
                    <AtButton type='primary' size='small' className='at-button-mini' onClick={handleToClassPlay}>
                      试听
                    </AtButton>
                  </View>
                </View>
                })
              }
           
            </View>
          </AtTabsPane>
          <AtTabsPane current={currentTab} index={1}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>课程大纲介绍</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    </View>
  );
};

export default ClassDetail;
