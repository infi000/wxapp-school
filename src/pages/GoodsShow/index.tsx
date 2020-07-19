// import Taro from '@tarojs/taro';
import Taro, { useRouter, useMemo } from '@tarojs/taro';
import { View, } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import GoodsDetail from './modules/GoodsDetail';
import BuysRecord from './modules/BuysRecord';
import './index.scss';
/**
 * 商品展示
 */
const GoodsShow = () => {
  const { isShowBuysPage } = useSelector((state) => state.goodsShow);
  const router = useRouter();
 const gid = useMemo(()=>{
    const { params } = router;
    return params.gid;
  },[router])
  return (
    <View>
      {
        isShowBuysPage?<BuysRecord /> : <GoodsDetail gid={gid} />
      }
    </View>
  );
};

export default GoodsShow;
