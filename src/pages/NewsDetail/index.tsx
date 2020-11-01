import Taro, { useDidShow, useState, useRouter } from '@tarojs/taro';
import { View, Block.Image, RichText } from '@tarojs/components';
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
  Taro.setNavigationBarTitle({
    title: '行业要闻',
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
        {/* <View className='at-article__p' dangerouslySetInnerHTML={{__html:newsDetail.content}}></View> */}
        <RichText className='at-article__p' nodes={newsDetail.content}></RichText>
        </View>
      </View>
    </View>
  );
};

export default NewsDetail;
