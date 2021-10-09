import Taro, { useDidShow, useState, useRouter } from '@tarojs/taro';
import { View, Block.Image, RichText, WebView } from '@tarojs/components';
import { getNewsDetail } from './services';
import { imgnotfount } from '@/static/images/index';
import { host } from '@/config/api';
import { useShare } from '@/utils/hooks';

const NewsDetail = () => {
  const [newsDetail, setNewsDetail] = useState('');
  const router = useRouter();
  useDidShow(() => {
    const { params } = router;
    const { url } = params || {};
    console.log("url", url);
    setNewsDetail( decodeURIComponent(url))
  });
  Taro.setNavigationBarTitle({
    title:'DI动力课堂',
  });

  return (
    <WebView src={'http://dakaadmin.tangguostore.com/live.html?url='+newsDetail}  />
    // <View className='newsDetail-wrap'>
    //   <View className='at-article'>
    //     <View className='article__top'>
    //       <View className='article__title'>{newsDetail.title}</View>
    //       <View className='article__info'>
    //         <View>{newsDetail.cfrom}</View>
    //         <View>{newsDetail.publishtime}</View>
    //       </View>
    //     </View>
    //     <View className='article__content'>
    //     <Image 
    //     className='at-article__img' 
    //     src={newsDetail.cover || imgnotfount} 
    //     mode='widthFix' />
    //     {/* <View className='at-article__p' dangerouslySetInnerHTML={{__html:newsDetail.content}}></View> */}
    //     <RichText className='at-article__p' nodes={HTML()}></RichText>
    //     </View>
    //   </View>
    // </View>
  );
};

export default NewsDetail;
