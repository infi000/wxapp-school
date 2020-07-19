import Taro from '@tarojs/taro';
import { View, Block, Image } from '@tarojs/components';
import { AtDivider } from 'taro-ui';
import SoldOut from '@/components/SoldOut';
import './index.scss';

const { useState } = Taro;

interface IProps {
  list: Array<IGoods>;
}
const GoodsList = (props: IProps) => {
  const { list = [] } = props;
  const handleChooseGoods = (opt) => {
    console.log(opt)
    const { id, issale } = opt;
    if (issale === '-1') {
      return;
    }
    Taro.navigateTo({ url: '/pages/GoodsShow/index?gid='+id });
  };
  return (
    <View>
      <View className='at-row at-row--wrap goods-list-con'>
        {list &&
          list.map((item, index) => {
            const { id, title, sale, fpath, price, issale } = item;
            return (
              <View className='at-col at-col-6 goods-con' key={id}>
                <View className='at-row at-row__justify--between goods-con-top'>
                  <View className='at-col at-col-5 goods-price'>${price}</View>
                  <View className='at-col at-col-5 goods-saler'>{sale}购买</View>
                </View>
                <View className='goods-con-mid' onClick={() => handleChooseGoods(item)}>
                  {issale === '-1' && (
                    <View className='soldout-con'>
                      <SoldOut />
                    </View>
                  )}
                  <Image mode='aspectFit' style='width: 100%;height: 100%;' src={fpath} />
                </View>
                <View className='goods-con-buttom text2line' onClick={() => handleChooseGoods(item)}>
                  {title}
                </View>
              </View>
            );
          })}
      </View>
      {list && list.length === 0 && <AtDivider fontColor='#c0c0c0' lineColor='#c0c0c0' fontSize='26' content='暂无更多' />}
    </View>
  );
};

export default GoodsList;
