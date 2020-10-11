import Taro, { useDidShow, useState } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import ListCon from '@/components/ListCon';
import { defaultNews } from '@/static/images/index';
import { getNewsSearch } from './services';
import './index.scss';
import { isArray } from 'lodash';

const PAGE_LEN = 1000;
const HotNews = () => {
  const handleToNewsDetail = (params) => {
    const { id } = params;
    Taro.navigateTo({ url: '/pages/NewsDetail/index?nid=' + id });
  };
  const [listInfo, setListInfo] = useState([]);
  // const listInfo = [
  //   {
  //     id: '1',
  //     image: defaultNews,
  //     handleClick: handleToNewsDetail,
  //     title: '职场中最高的自律，是放弃不断改变',
  //     desc: '很多年前，我刚刚进入职场的时候，遇到一位领导。很多年前，我刚刚进入职场的时候，遇到一位领导。',
  //     tags: ['新闻', '2020-10-12 12:12:12'],
  //   },
  //   {
  //     id: '2',
  //     image: defaultNews,
  //     handleClick: handleToNewsDetail,
  //     title: '职场中最高的自律，是放弃不断改变，是放弃不断改变',
  //     desc:
  //       '很多年前，我刚刚进入职场的时候，遇到一位领导。很多年前，我刚刚进入职场的时候，遇到一位领导，遇到一位领导。很多年前，我刚刚进入职场的时候，遇到一位领导，遇到一位领导。很多年前，我刚刚进入职场的时候，遇到一位领导。',
  //     tags: ['2020-10-12 12:12:12'],
  //   },
  // ];
  useDidShow(() => {
    getNewsSearch({ offset: 0, count: PAGE_LEN }).then((d) => {
      const news = d.news;
      if(Array.isArray(news)){
       const res:any =  news.map((item)=>{
          return {
            ...item,
            image:item.cover || defaultNews,
            desc:item.ndes || '无',
            tags:[`${new Date(Number(item.publishtime+'000')).toLocaleString()}`],
            handleClick:handleToNewsDetail
          }
        })
        setListInfo(res)
      }
    });
    Taro.setNavigationBarTitle({
      title: '行业要闻',
    });
  });
  return (
    <View className='hotNews-wrap'>
      <ListCon listInfo={listInfo} />
    </View>
  );
};

export default HotNews;
