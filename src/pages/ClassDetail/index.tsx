import Taro, { showToast, useDidShow, useRouter } from '@tarojs/taro';
import { AtAvatar, AtTag, AtTabs, AtTabsPane, AtButton, AtActionSheet, AtActionSheetItem } from 'taro-ui';
import { View, Block, Image } from '@tarojs/components';
import TitleCon from '@/components/TitleCon';
import ClassImg from './Componets/ClassImg';
import { getCourseDetail, addCourseAttcourse, courseWareLearn, getExamstart, getLastcourse, isBuyCid, payex, createorder, } from './services';
import { showSuccessToast } from '@/utils/util';
import './index.scss';
import { get, isArray } from 'lodash';
import { CWTYPE_MAP } from './canstants';
import { useShare } from '@/utils/hooks';
import { useSelector } from '@tarojs/redux';
const { useState, useEffect } = Taro;
const tabList = [{ title: '课程大纲' }, { title: '课程介绍' }];

const ClassDetail = () => {
  const [classDetail, setClassDetail]: [any, any] = useState({});
  const {userIsAuth } = useSelector((state: any) => state.main);
  const [actionSheet, setActionSheet]: [any, any] = useState({ show: false, data: {} });
  const [classActionSheet, setClassActionSheet]: [any, any] = useState({ show: false, data: {} });
  const [currentTab, setCurrentTab] = useState(0);
  const [isBuy, setIsBuy] = useState(false);
  const router = useRouter();
  const { params } = router;
  const { cid = '', from = '' } = params || {};
  useShare();
  Taro.setNavigationBarTitle({
    title: 'DI动力课堂'
  });
  const handleToClassPlay = () => {
    const { cwtype, files, id, cwname } = actionSheet.data;
    setActionSheet({ show: false, data: {} });
    setClassActionSheet({ show: false, data: {} });
    courseWareLearn({ cwid: id, cid: classDetail.id });
    if (cwtype == 1 || cwtype == 3) {
      Taro.navigateTo({ url: `/pages/ClassPlay/index?cwid=${files[0].cwid}&fpath=${files[0].fpath}&id=${files[0].id}&cwname=${cwname}&cid=${classDetail.id}&cwtype=${cwtype}` });
      return;
    }
    if ([4,5].includes(Number(cwtype))) {
      Taro.downloadFile({
        url: files[0].fpath,
        success(res) {
          const filePath = res.tempFilePath;
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

  const handleBuy = async (cid, money) => {
    const { orderid } =  await createorder({cid, money});
    payex({orderid, paytype: 'miniwxpay' }).then(d => {
      if (d == '1') {
        Taro.navigateBack({
          delta: 1 , success: function (res) {
            Taro.showToast({
              title: '购买成功',
              icon: 'success',
              duration: 2000
            })
          }
        });
        return;
      }
      const { arraydata } = d || {};
      const { nonceStr, timeStamp, signType, paySign } = arraydata || {};
      const pak = arraydata.package;
      Taro.requestPayment({
        timeStamp: timeStamp + "",
        nonceStr: nonceStr,
        package: pak,
        signType,
        paySign,
        success: function (res) {
          console.log('res', res)
          Taro.showToast({
            title: '购买成功',
            icon: 'success',
            duration: 2000
          })
          setIsBuy(true)
          // 返回上一级页面。

        },
        fail: function (err) {
          console.log('err', err)
          Taro.showToast({
            title: '购买失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    })
  }


  const handleActionClass = () => {
    const id = get(classDetail, ['id'], '');
    const cname = get(classDetail, ['cname'], '');
    setClassActionSheet({ show: true, data: { id, cname } });
  };
  useDidShow(() => {
    // 判断是从课程分类里进的还是从课程进的
    if (from == '分类') {
      getLastcourse({ cid })
        .then((d) => {
          setClassDetail(d);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getCourseDetail({ cid })
        .then((data) => {
          setClassDetail(data);
          isBuyCid({cid}).then(d => {
            console.log(' classDetail.money', data);
            if(d == 1 || data.money == '0.00'){
              setIsBuy(true);
            }else{
              setIsBuy(false);
            }
            console.log('isBuyCid', d);
          })
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                  {
                    isBuy ? <AtButton disabled type='secondary' size='small' className='at-button-mini  classDetail-btn-buy'>
                    已购买
                  </AtButton> : 
                  
                    userIsAuth==1? <AtButton type='secondary' size='small'  className='at-button classDetail-btn-buy' onClick={() => handleBuy(classDetail.id, classDetail.money)}>
                    {`请付款：¥${get(classDetail, ['money'], '-')}`}
                 </AtButton> :null
                  
                  }
            
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
                {/* <View className='at-row class-item'>
                  <View className='at-col at-col-2'>
                    <AtTag size='small'>主课程</AtTag>
                  </View>
                  <View className='at-col at-col-8  class-item-desc'>《{get(classDetail, ['cname'], '暂无')}》</View>
                  <View className='at-col at-col-2'>
                    <AtButton type='primary' size='small' className='at-button-mini' onClick={handleActionClass}>
                      操作
                    </AtButton>
                  </View>
                </View> */}
                {classDetail.sourceware && get(classDetail, ['sourceware'], []).map((item) => {
                  return (
                    <View className='at-row class-item' key={item.cwname}>
                      <View className='at-col at-col-2'>
                        <AtTag size='small'>{CWTYPE_MAP[item.cwtype]}</AtTag>
                      </View>
                      <View className='at-col at-col-8  class-item-desc'>{item.cwname}</View>
                      <View className='at-col at-col-2'>
                        <AtButton
                          disabled={!isBuy}
                          type='primary'
                          size='small'
                          className='at-button-mini'
                          onClick={() => setActionSheet({ show: true, data: item })}
                        >
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
        {/* <AtActionSheetItem onClick={() => handleToExam('3')}>每日一测</AtActionSheetItem> */}
        {/* <AtActionSheetItem onClick={() => handleToExam('2')}>随堂测验</AtActionSheetItem> */}
        {/* <AtActionSheetItem onClick={() => handleToExam('1')}>考试</AtActionSheetItem> */}
      </AtActionSheet>
      <AtActionSheet
        isOpened={classActionSheet.show}
        title={classActionSheet.data ? classActionSheet.data.cwname : '请选择'}
        cancelText='取消'
        onCancel={() => setClassActionSheet({ show: false, data: {} })}
        onClose={() => setClassActionSheet({ show: false, data: {} })}
      >
        {/* <AtActionSheetItem onClick={() => handleClassToExam('3')}>每日一测</AtActionSheetItem> */}
        <AtActionSheetItem onClick={() => handleClassToExam('2')}>随堂测验</AtActionSheetItem>
        {/* <AtActionSheetItem onClick={() => handleClassToExam('1')}>考试</AtActionSheetItem> */}
      </AtActionSheet>
    </View>
  );
};

export default ClassDetail;
