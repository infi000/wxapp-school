import Taro from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import ListCon from '@/components/ListCon';
import { defaultNews } from '@/static/images/index';
import './index.scss';

const HotNews = () => {
  const handleToNewsDetail = (params) => {
    console.log(123123);
    const { id } = params;
    Taro.navigateTo({ url: '/pages/NewsDetail/index?id=' + id });
  };
  const listInfo = [
    {
      id: '1',
      image: defaultNews,
      handleClick: handleToNewsDetail,
      title: '职场中最高的自律，是放弃不断改变',
      desc: '很多年前，我刚刚进入职场的时候，遇到一位领导。很多年前，我刚刚进入职场的时候，遇到一位领导。',
      tags: ['新闻', '2020-10-12 12:12:12'],
    },
    {
      id: '2',
      image: defaultNews,
      handleClick: handleToNewsDetail,
      title: '职场中最高的自律，是放弃不断改变，是放弃不断改变',
      desc:
        '很多年前，我刚刚进入职场的时候，遇到一位领导。很多年前，我刚刚进入职场的时候，遇到一位领导，遇到一位领导。很多年前，我刚刚进入职场的时候，遇到一位领导，遇到一位领导。很多年前，我刚刚进入职场的时候，遇到一位领导。',
      tags: ['2020-10-12 12:12:12'],
    },
  ];
  return (
    <View className='hotNews-wrap'>
      <ListCon listInfo={listInfo} />
    </View>
  );
};

export default HotNews;
