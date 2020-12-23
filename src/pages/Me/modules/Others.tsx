import Taro, { useEffect, useState, useMemo } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import '../index.scss';
import { useSelector } from '@tarojs/redux';

const LIST_URL_MAP = [
  // { name: '设置密码', url: '/pages/PhotoWall/index' },
  { name: '帮助中心', url: '/pages/HelpCenter/index' },
  { name: '每日小测', url: '/pages/TestClass/index' },
  { name: '小测结果', url: '/pages/TestResult/index' },
  // { name: '当日报告', url: '/pages/Kefu/index' },
  { name: '学习历史', url: '/pages/LearnHistory/index' },
  { name: '用户认证', url: '/pages/UserAuth/index' },
];

const Others = () => {
  const { userIsAuth } = useSelector((state) => state.main);

  const handleClickItem = (url) => {
    Taro.navigateTo({ url });
  };
  const list_arr = useMemo(() => {
    let res:any = [];
    if (userIsAuth == 1){
      // 已经认证
      res = LIST_URL_MAP.filter(item => ['帮助中心', '每日小测', '小测结果','学习历史'].includes(item.name))
    }else{
      res = LIST_URL_MAP.filter(item => ['帮助中心', '用户认证'].includes(item.name))
    }
    return res;
  }, [userIsAuth])
  return (
    <View className='me-other-wrap'>
      {list_arr.map((item) => {
        const { name, url } = item;
        return <View
          className='at-row me-others-con'
          key={name}
          onClick={() => {
            handleClickItem(url);
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
