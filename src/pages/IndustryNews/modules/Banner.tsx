import Taro, { useDidShow, useState, useEffect } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Image } from '@tarojs/components';
import { getNewsBanners } from '../services';
import { imgnotfount } from '@/static/images/index';
import '../index.scss';

const Banner = () => {
  const [bannerList, setBannerList] = useState([]);
  useEffect(() => {
    console.log(123)
    getNewsBanners().then(d=>{
      d.news && setBannerList(d.news);
    }).catch(e =>{
      console.log(e);
    })
  },[]);
  return (
    <View className='banner-wrap'>
      <View className='banner-con'>
        <Swiper className='swiper-con' indicatorColor='#999' indicatorActiveColor='#333' circular indicatorDots autoplay>
          {bannerList &&
            bannerList.map((item) => {
              const { cover, id, } = item;
              return (
                <SwiperItem key={id}>
                  <Image mode='aspectFill' style='width: 100%;height: 100%;' src={cover || imgnotfount} />
                </SwiperItem>
              );
            })}
        </Swiper>
      </View>
    </View>
  );
};

export default Banner;
