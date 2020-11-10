import Taro, { useDidShow, useEffect, useState } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import '../index.scss';
import { getMyattnews } from '../services';
import { defaultNews } from '@/static/images/index';
import ListCon from '@/components/ListCon';

const MyCollectNews = (props) => {
    const [listInfo, setListInfo] = useState([]);
  const handleToNewsDetail = (params) => {
    const { id } = params;
    Taro.navigateTo({ url: '/pages/NewsDetail/index?nid=' + id });
  };
  useDidShow(() => {
    getMyattnews().then((d) => {
      const news = d.news;
      if(Array.isArray(news)){
       const res:any =  news.map((item)=>{
          return {
            ...item,
            image:item.cover || defaultNews,
            desc:item.ndes || '无',
            tags:[item.cfrom, `${new Date(Number(item.publishtime+'000')).toLocaleString()}`],
            handleClick:handleToNewsDetail
          }
        })
        setListInfo(res)
      }
    });
    Taro.setNavigationBarTitle({
      title:'华鑫学堂',
    });
  });
  return (
    <View className=''>
      <ListCon listInfo={listInfo} />
    </View>
  );
};

export default MyCollectNews;
