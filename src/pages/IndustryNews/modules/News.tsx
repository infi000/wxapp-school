import Taro, { useDidShow, useState,useEffect } from '@tarojs/taro';
import { View, } from '@tarojs/components';
import ListCon from '@/components/ListCon';
import TitleCon from '@/components/TitleCon';
import {getNewsSearch} from '../services';
import { defaultNews } from '@/static/images/index';
import '../index.scss';



const News = () => {
  const [hotNews, setHotNews] = useState([]);
   const handleToNews = () =>{
    Taro.navigateTo({ url:'/pages/HotNews/index'});
  }
  const handleToNewsDetail = (params) => {
    const { id } = params;
    Taro.navigateTo({ url: '/pages/NewsDetail/index?nid=' + id });
  };
  useEffect(() => {
    getNewsSearch().then(d=>{
      if(Array.isArray(d.news)){
        setHotNews(d.news.map(item=>{
          return {
            ...item,
            id:item.id,
            title:item.title,
            image:item.cover || defaultNews,
            desc:'无',
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
