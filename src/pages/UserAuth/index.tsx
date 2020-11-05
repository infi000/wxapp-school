// 用户认证

import Taro, { useDidShow, useState, useRouter } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import _Uploader from '@/components/Tabbar';
import { useSelector, useDispatch } from '@tarojs/redux';
import './index.scss';
// import {} from './services';
import { AtButton, AtGrid, AtInput } from 'taro-ui';
const Uploader: any = _Uploader;
const getMyattcourse: any = () => {};
const UserAuth = (props) => {
  Taro.setNavigationBarTitle({
    title: '用户认证',
  });
  const router = useRouter();
  const handleUpdateForm = (params) => {};
  const handleChoose = (item) => {
    console.log(item);
    const { path } = item;
    if (path) {
      Taro.navigateTo({ url: path });
    }
  };
  useDidShow(() => {
    const { params } = router;
    const { cid = 1 } = params || {};
  });

  return (
    <View className='baseWrap'>
      <AtInput name='value' title='姓名' type='text' placeholder='张三' value={''} onChange={() => {}} />
      <AtInput name='value' title='身份证号' type='text' value={''} onChange={() => {}} />
      <View>
        身份证
        <Uploader length={3} uploadSucc={(e) => handleUpdateForm({ pics: e })} />
      </View>
      <View>
        头像
        <Uploader length={3} uploadSucc={(e) => handleUpdateForm({ pics: e })} />
      </View>
      <AtButton type='primary' size='small' onClick={() => {}}>
        提交
      </AtButton>
    </View>
  );
};

export default UserAuth;
