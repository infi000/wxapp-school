import Taro, { useDidShow, useState,useEffect } from '@tarojs/taro';
import { View, } from '@tarojs/components';
import ListCon from '@/components/ListCon';
import TitleCon from '@/components/TitleCon';
import {getNewsSearch} from '../services';
import { defaultNews } from '@/static/images/index';
import '../index.scss';
import { formatNews } from '@/utils/util';
import { useDispatch } from '@tarojs/redux';



const News = () => {
  const [hotNews, setHotNews] = useState([]);
  const dispatch = useDispatch();

   const handleToNews = () =>{
    Taro.navigateTo({ url:'/pages/HotNews/index'});
  }
  const handleToNewsDetail = (params) => {
    dispatch({ type: 'main/updateNewsInfo', payload: params });

    const { url } = params;
    console.log("params", params);
    

    Taro.navigateTo({ url: '/pages/NewsDetail/index?url=' +  encodeURIComponent(url)});
  };
  useEffect(() => {
    getNewsSearch().then(d=>{
      if(Array.isArray(d.item)){
        const news:any  = formatNews(d.item)
        console.log(news);
        setHotNews(news.map(item=>{
          return {
            ...item,
            // id:item.id,
            title:item.title,
            image:item.thumb_url || defaultNews,
            desc:item.digest || '无',
            handleClick:handleToNewsDetail
          }
        })) 
      }
    }).catch(e =>{
      console.log(e);
    })
  },[]);
  return (
    <View className='news-wrap'>
      <TitleCon title='行业要闻' tag='查看更多' onClick={handleToNews}/>
      <View>
        <ListCon listInfo={hotNews} />
      </View>
    </View>
  );
};

export default News;
