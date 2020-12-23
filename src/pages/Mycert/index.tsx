import Taro, { useDidShow, useState } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import './index.scss';
import { AtGrid } from 'taro-ui';
import { getMycert } from './services';
import { isArray } from 'lodash';

const MyCert = () => {
  Taro.setNavigationBarTitle({
    title: '热线学堂',
  });
  const [certs, setCerts] = useState([]);
  const handleChoose = (item) => {
    const { certpath } = item;
    const urls = certs.map((item:any) => item.image);
    Taro.previewImage({
      current: certpath, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  };
  useDidShow(() => {
    getMycert()
      .then((d) => {
        d.certs &&
          isArray(d.certs) &&
          setCerts(
            d.certs.map((item) => {
              return {
                ...item,
                image: item.certpath,
              };
            })
          );
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return (
    <View className='myCert-wrap'>
      <AtGrid mode='square' columnNum={2} hasBorder={true} onClick={handleChoose} data={certs} />
    </View>
  );
};

export default MyCert;
