import Taro from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import Tabbar from '@/components/Tabbar';
import IndustryNews from '@/pages/IndustryNews';
import OnlineStudy from '@/pages/OnlineStudy';
import Me from '@/pages/Me';
import { ROUTER_NAME_MAP } from '@/constants/index';

const Main = (props) => {
  const { nav, currentNavIndex } = useSelector((state) => state.tabbar);

  return (
    <View>
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.industryNews && <IndustryNews />}
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.onlineStudy && <OnlineStudy />}
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.me && <Me />}
      <Tabbar />
    </View>
  );
};

export default Main;
