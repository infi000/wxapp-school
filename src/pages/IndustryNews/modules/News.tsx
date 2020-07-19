import Taro from '@tarojs/taro';
import { View, } from '@tarojs/components';
import ListCon from '@/components/ListCon';
import TitleCon from '@/components/TitleCon';

import { defaultNews } from '@/static/images/index';
import '../index.scss';



const News = () => {
  
   const handleToNews = () =>{
    Taro.navigateTo({ url:'/pages/HotNews/index'});
  }
  const handleToNewsDetail = (params) => {
    console.log(123123);
    const { id } = params;
    Taro.navigateTo({ url: '/pages/NewsDetail/index?id=' + id });
  };
  const listInfo = [
    {
      id:'1',
      image: defaultNews,
      onClick: () => {},
      title: '职场中最高的自律，是放弃不断改变',
      desc: '很多年前，我刚刚进入职场的时候，遇到一位领导。很多年前，我刚刚进入职场的时候，遇到一位领导。',
      handleClick:handleToNewsDetail
    },
    {
      id:'2',
      image: defaultNews,
      onClick: () => {},
      title: '职场中最高的自律，是放弃不断改变，是放弃不断改变',
      desc: '很多年前，我刚刚进入职场的时候，遇到一位领导。很多年前，我刚刚进入职场的时候，遇到一位领导。',
      handleClick:handleToNewsDetail
    },
  ];
  return (
    <View className='news-wrap'>
      <TitleCon title='行业要闻' tag='查看更多' onClick={handleToNews}/>
      <View>
        <ListCon listInfo={listInfo} />
      </View>
    </View>
  );
};

export default News;
