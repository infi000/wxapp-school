import Taro, { useDidShow, useEffect } from '@tarojs/taro';
import { View, Checkbox } from '@tarojs/components';
import { AtList, AtListItem, AtButton, AtGrid, AtInput, AtTextarea, AtActionSheetItem } from 'taro-ui';

import { useSelector, useDispatch } from '@tarojs/redux';
// import ListItem from './modules/ListItem';
import './index.scss';
import { isArray } from 'lodash';
import { addMsg, getMsg } from './services';
import { showSuccessToast } from '@/utils/util';

const { useState, useEffect } = Taro;

const Collect = () => {
  const [feedBack, setFeedBack] = useState([]);
  const dispatch = useDispatch();
  const [inputVal, setInputVal] = useState('');
  Taro.setNavigationBarTitle({
    title: '热线学堂',
  });
  const handleGetMsg = () => {
    getMsg({ offset: 0, count: 100 }).then(d => {
      d.messages && setFeedBack(d.messages);
    }).catch(e => {
      console.log(e);
    })
  }
  const handleSubmite = () => {
    inputVal && addMsg({ data: inputVal }).then(() => {
      handleGetMsg();
      setInputVal('');
      showSuccessToast('提交成功')
    })
  }
  useDidShow(() => {

    handleGetMsg();
  });
  return (
    <View className='feedback-wrap'>
      <View className='feedback-content'>
      {
        isArray(feedBack) && feedBack.length> 0 ? feedBack.map((item: any) => <View className='feedback-item'>
          {item.ctime} 反馈：
            <View>{item.content}</View>
            管理员回复：{item.backcontent || '暂无回复'}
        </View>)
        :'暂无数据'
      }
      </View>
  
      <View className='feedback-form'>
        <AtTextarea type='text' value={inputVal} onChange={(e:any) => setInputVal(e)} />
        <AtButton type='primary' size='small' onClick={handleSubmite}>
          提交
      </AtButton>
      </View>
    </View>
  );
};

export default Collect;
