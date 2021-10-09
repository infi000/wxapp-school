import Taro, { useDidShow, useState } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import ListCon from '@/components/ListCon';
import { defaultNews } from '@/static/images/index';
import { getNewsSearch } from './services';
import './index.scss';
import { isArray } from 'lodash';
import { formatNews } from '@/utils/util';
import { useDispatch } from '@tarojs/redux';

const PAGE_LEN = 1000;
const HotNews = () => {
  const dispatch = useDispatch();


  const handleToNewsDetail = (params) => {
    dispatch({ type: 'main/updateNewsInfo', payload: params });

    const { url } = params;
    console.log("params", params);
    

    Taro.navigateTo({ url: '/pages/NewsDetail/index?url=' +  encodeURIComponent(url)});
  };


  const [listInfo, setListInfo] = useState([]);

  useDidShow(() => {
    getNewsSearch({ offset: 0, count: PAGE_LEN }).then((d) => {
      const news = d.item;
      if(Array.isArray(news)){
        const news2:any  = formatNews(d.item)
       const res:any =  news2.map((item)=>{
          return {
            ...item,
            image:item.thumb_url || defaultNews,
            desc:item.digest || '无',
            tags:[`${new Date(Number(item.create_time+'000')).toLocaleString()}`],
            handleClick:handleToNewsDetail
          }
        })
        setListInfo(res)
      }
    });
    Taro.setNavigationBarTitle({
      title: 'DI动力课堂',
    });
  });
  console.log("listInfo", listInfo);
  return (
    <View className='hotNews-wrap'>
      <ListCon listInfo={listInfo} />
    </View>
  );
};

export default HotNews;
