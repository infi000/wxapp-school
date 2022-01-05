import Taro, { useEffect, useState, useMemo, useDidShow } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import '../index.scss';
import { useSelector } from '@tarojs/redux';
import { isopencertification } from '../services';

const LIST_URL_MAP = [
  // { name: '设置密码', url: '/pages/PhotoWall/index' },
  // { name: '帮助中心', type:'helpCetner' },
  { name: '反馈中心', url: '/pages/Feedback/index' },
  // { name: '测试学习', url: '/pages/TestClass/index' },
  // { name: '小测结果', url: '/pages/TestResult/index' },
  // { name: '当日报告', url: '/pages/Kefu/index' },
  { name: '学习历史', url: '/pages/LearnHistory/index' },
  { name: '用户认证(请进行实名认证)', url: '/pages/UserAuth/index' },
];

const Others = () => {
  const { userIsAuth } = useSelector((state) => state.main);
  const handleClickItem = (url) => {
    Taro.navigateTo({ url });
  };
  const handleDownLoad = () => {
    Taro.downloadFile({
      url: 'http://xch.xuexiao.ntof.club/help.docx',
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
  }

  const list_arr = useMemo(() => {
    let res: any = [];
    if (userIsAuth == 1) {
      // 已经认证
      res = LIST_URL_MAP.filter(item => ['帮助中心', '反馈中心', '学习历史'].includes(item.name))
    } else {
      res = LIST_URL_MAP.filter(item => ['帮助中心', '反馈中心', '学习历史','用户认证(请进行实名认证)'].includes(item.name))
    } 
    return res;
  }, [userIsAuth])
  useEffect(() => {
    // isopencertification().then(d => setIsShowUserAuth(d));

  },[])
  return (
    <View className='me-other-wrap'>
      {list_arr.map((item) => {
        const { name, url, type } = item;
        return <View
          className='at-row me-others-con'
          key={name}
          onClick={() => {
            if (type === 'helpCetner') {
              handleDownLoad()
            } else {
              if(userIsAuth !== 1){
                handleClickItem('/pages/UserAuth/index');

                return;
              }
              handleClickItem(url);
            }
          }}
        >
          <View className='at-col-6 textL'>{name}</View>
          <View className='at-col-6 textR'></View>
        </View>
      })}
    </View>
  );
};

export default Others;
