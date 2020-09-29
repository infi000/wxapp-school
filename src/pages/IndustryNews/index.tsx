import Taro from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import SearchBar from './modules/SearchBar';
import News from './modules/News';
import Banner from './modules/Banner';
import RecommendClass from './modules/RecommendClass';
import HotClass from './modules/HotClass';
import './index.scss';

const IndustryNews = () => {
  return (
    <View className='industryNews-wrap'>
      {/* <SearchBar /> */}
      <Banner />
      {/* <TagBar /> */}
      <HotClass />
      <News />
      <RecommendClass />
    </View>
  );
};

export default IndustryNews;
