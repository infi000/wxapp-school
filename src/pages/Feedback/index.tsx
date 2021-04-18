import Taro, { useDidShow, useEffect } from '@tarojs/taro';
import { View, Checkbox, AtInput, AtButton } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import ListItem from './modules/ListItem';
import './index.scss';
import { isArray } from 'lodash';
import { addMsg, getMsg } from './services';
import { showSuccessToast } from '@/utils/util';

const { useState, useEffect } = Taro;

const Collect = () => {
  const [feedBack, setFeedBack] = useState([]);
  const dispatch = useDispatch();
  const [inputVal, setInputVal] = useState('');

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
      {
        feedBack.map((item: any) => <View className='feedback-item'>
          {item.ctime} 反馈：
            <View>{item.content}</View>
            管理员回复：{item.backcontent || '暂无回复'}
        </View>)
      }
      <View>
        <AtInput name='value' title='姓名' type='text' value={inputVal} onChange={setInputVal} />
        <AtButton type='primary' size='small' onClick={handleSubmite}>
          提交
      </AtButton>
      </View>
    </View>
  );
};

export default Collect;
