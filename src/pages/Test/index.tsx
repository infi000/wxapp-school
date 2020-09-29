import Taro, { useRouter, useDidShow, useShareAppMessage } from '@tarojs/taro';
import { View, Checkbox, Block } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import { useCheckBoxList } from '@/utils/hooks';
import { useDispatch } from '@tarojs/redux';

const Test = () => {
 console.log("加载了test!!!!");
 const dispatch = useDispatch();
 const router = useRouter();
 useDidShow(() => {
   const { params } = router;
   const {gid,title} = params;
   dispatch({ type: 'goodsShow/updateGid', payload: gid });
   dispatch({ type: 'goodsShow/getDetail' });
   dispatch({ type: 'goodsShow/getPageBuysRecord', payload: { refresh: true } });
   dispatch({ type: 'goodsShow/getRelatedGoods' });
   dispatch({ type: 'goodsShow/getIsfav' });
   Taro.setNavigationBarTitle({
     title:title||'糖'
   });
 });
 useShareAppMessage(res => {
   const { params } = router;
   const {gid,title} = params;
   // let imageUrl = loglqr;
   // if(detail && detail.fpath){
   //   imageUrl = detail.fpath;
   // }
   return {
     title: title || '糖',
     path: '/pages/GoodsShow/index?gid=' + gid + '&title=' + title ,
     // imageUrl
   }
 })
  return (
    <View>
            haashfahsfhasf
    </View>
  );
};

export default Test;
