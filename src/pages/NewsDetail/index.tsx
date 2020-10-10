import Taro, { useDidShow, useState, useRouter } from '@tarojs/taro';
import { View, Block.Image } from '@tarojs/components';
import { getNewsDetail } from './services';
import { imgnotfount } from '@/static/images/index';
import './index.scss';
const defatulNews:any ={};
const NewsDetail = () => {
  const [newsDetail, setNewsDetail] = useState(defatulNews);
  const router = useRouter();
  useDidShow(() => {
    const { params } = router;
    const { nid } = params || {};
    getNewsDetail({nid}).then(d=>{
      setNewsDetail(d);
    }).catch(e =>{
      console.log(e);
    })
  });
  return (
    <View className='newsDetail-wrap'>
      <View className='at-article'>
        <View className='article__top'>
          <View className='article__title'>{newsDetail.title}</View>
          <View className='article__info'>
            <View>{newsDetail.cfrom}</View>
            <View>{newsDetail.publishtime}</View>
          </View>
        </View>
        <View className='article__content'>
        <Image 
        className='at-article__img' 
        src={newsDetail.cover || imgnotfount} 
        mode='widthFix' />
        <View className='at-article__p'>{newsDetail.content}</View>
        </View>
      </View>
    </View>
  );
};

export default NewsDetail;
