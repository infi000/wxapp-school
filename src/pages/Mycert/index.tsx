import Taro, { useDidShow, useState } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import './index.scss';
import { AtGrid } from 'taro-ui';
import { getMycert } from './services';
import { isArray } from 'lodash';

const MyCert = () => {
  Taro.setNavigationBarTitle({
    title: '华鑫学堂',
  });
  const [certs, setCerts] = useState([]);
  const handleChoose = (item) => {
    console.log(item);
    const { certpath } = item;
    if (certpath) {
      Taro.navigateTo({ url: certpath });
    }
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
