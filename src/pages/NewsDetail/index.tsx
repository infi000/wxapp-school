import Taro, { useDidShow, useState, useRouter } from '@tarojs/taro';
import { View, Block.Image, RichText } from '@tarojs/components';
import { getNewsDetail } from './services';
import { imgnotfount } from '@/static/images/index';
import { host } from '@/config/api';
import './index.scss';
function formatRichText(html) { //控制小程序中图片大小
  let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
    console.log(match.search(/style=/gi));
    if(match.search(/style=/gi) == -1){
      match = match.replace(/\<img/gi,'<img style=""');
    }
    return match;
  });
  
  newContent = newContent.replace(/style="/gi, '$& max-width:100% !important; ');
  newContent = newContent.replace(/<br[^>]*\/>/gi, '');
  return newContent;
    }
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
    title:'热线学堂',
  });
  const HTML = () => {
    let str = newsDetail.content;
    // let str = or;
    // str = str.replace(/\ +/g,"");
    str = str.replace(/[\r\n]/g,"");        
    str = str.replace(/alt=""/g,"");        
    str = str.replace(/src="/g,`src="${host}`);     

    return formatRichText(str);
  }
  console.log(HTML());
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
        <RichText className='at-article__p' nodes={HTML()}></RichText>
        </View>
      </View>
    </View>
  );
};

export default NewsDetail;
