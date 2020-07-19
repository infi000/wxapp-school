import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import EditAddress from './modules/EditAddress';
import ListAddress from './modules/ListAddress';
import { useSelector, useDispatch } from '@tarojs/redux';
import './index.scss';

const Address = () => {
  console.log("加载address");
  const { modal } = useSelector((state) => state.address);
  return <View>{modal.show ? <EditAddress /> : <ListAddress />}</View>;
  // return <View> <EditAddress /></View>;
};

export default Address;
