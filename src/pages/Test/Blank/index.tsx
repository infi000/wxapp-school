import Taro, { useEffect } from '@tarojs/taro';
import { View, Checkbox, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtList, AtListItem } from 'taro-ui';
import { useCheckBoxList } from '@/utils/hooks';
import './index.scss';
import { isArray } from 'lodash';

const { useState, useEffect } = Taro;

const Collect = () => {
  const { favoriteList = { total: 0, list: [] } } = useSelector((state) => state.collect);
  const dispatch = useDispatch();
  const { handleSelectedAll, handleSelected, isSelectedAll, checkBoxList, checkedItem } = useCheckBoxList(favoriteList.list);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const handleEdit = (params) => {
    setIsEdit(params);
  };
  const handleDel = () => {
    console.log('删除', checkedItem);
    let res = [];
    if(checkedItem.length>0 && isArray(checkedItem)){
      res = checkedItem.map((item) => item.goodid)
    }
    dispatch({ type: 'collect/delFav', params: { gid: res.join(",") } });
    handleEdit(false);
    handleSelectedAll(false);
  };
  const handleGoto = (item) => {
    const { gid } = item;
    
    Taro.navigateTo({ url: '/pages/GoodsShow/index?gid=' + gid });
  };
  useEffect(() => {
    dispatch({ type: 'collect/init' });
    dispatch({ type: 'collect/geFavorite' });
  }, []);
  return (
    <View className='collect-wrap'>
      
    </View>
  );
};

export default Collect;
