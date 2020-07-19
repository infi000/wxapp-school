// import Taro from '@tarojs/taro';
import Taro, { useRouter } from '@tarojs/taro';
import { AtNavBar } from 'taro-ui';
import { View, ScrollView } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { isArray, toNumber } from 'lodash';
import '../index.scss';

const { useState, useEffect, useMemo } = Taro;
/**
 * 商品展示
 */
const GoodsDetail = () => {
  const { buysRecordList } = useSelector((state) => state.goodsShow);
  const dispatch = useDispatch();
  const buysList = useMemo(() => {
    const { buys = [] } = buysRecordList;
    if (isArray(buys)) {
      return buys;
    }
    return [];
  }, [buysRecordList]);
  const handleClose = () => {
    dispatch({ type: 'goodsShow/updateIsShowBuysPaget', payload: false });
  };
  const onScrollToLower = (e) =>{
    console.log("onScrollToLower", e);
    dispatch({type:'goodsShow/getPageBuysRecord'});
  }
  useEffect(() => {
    dispatch({ type: 'goodsShow/getPageBuysRecord', payload: { refresh: true } });
  }, []);
  return (
    <View className='buys-wrap'>
      <AtNavBar onClickLeftIcon={handleClose} color='#000' title='购买记录' leftText='返回' fixed border />

      <View className='goodsshow-con goods-sale-con'>
        <ScrollView
          scrollY
          scrollWithAnimation
          scrollTop={0}
          style={{ height: '1000px' }}
          lowerThreshold={50}
          refresherEnabled
          refresherThreshold={20}
          onScrollToLower={onScrollToLower}
        >
          <View className='goods-sale-min goods-sale-mid'>
            {buysList.length > 0 &&
              buysList.map((item) => {
                const { create_time, id, price, title } = item;
                const formatCt = toNumber(create_time + '000');
                return (
                  <View key={id} className='at-row at-row__justify--between goods-sale-record-con'>
                    <View className='at-col at-col-4 goods-sale-record-l'>{title}</View>
                    <View className='at-col at-col-4 goods-sale-record-m '>¥{price}</View>
                    <View className='at-col at-col-4 goods-sale-record-r'>{new Date(formatCt).toLocaleDateString()}</View>
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default GoodsDetail;
