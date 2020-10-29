import Taro, { useEffect, useState } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import '../index.scss';

const LIST_URL_MAP = [
  // { name: '设置密码', url: '/pages/PhotoWall/index' },
  // { name: '帮助中心', url: '/pages/Collect/index' },
  { name: '每日小测', url: '/pages/TestClass/index' },
  { name: '小测结果', url: '/pages/TestResult/index' },
  // { name: '当日报告', url: '/pages/Kefu/index' },
  // { name: '学习历史', url: '/pages/Kefu/index' },
];

const tmplIds = ['vqWshHTalxdFaNqhdSWJ8Mkb7HsysV39m1h9Yk-94hY', '05mTNKODj3164t8tEgu60oLUyqddSUHtjAOS6i1S0Zs'];
const Others = () => {
  const [tmplIds, setTmplIds]: [string[], any] = useState([]);
  const handleClickItem = (url) => {
    Taro.navigateTo({ url });
  };

  return (
    <View className='me-other-wrap'>
      {LIST_URL_MAP.map((item) => {
        const { name, url } = item;
        return (
          <View
            className='at-row me-others-con'
            key={name}
            onClick={() => {
              handleClickItem(url);
            }}
          >
            <View className='at-col-6 textL'>{name}</View>
            <View className='at-col-6 textR'></View>
          </View>
        );
      })}
    </View>
  );
};

export default Others;
