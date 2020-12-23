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
const htmlSnip =
`<img src="/Uploads/Editor/2020-12-16/5fd8e4be1d247.jpg"/> 
<p>	<span><span style="color:red">测试</span><span style="color:red">测试</span><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span></span> </p><p>	<span><span style="color:#000000;"><video src="/Uploads/Editor/2020-12-16/5fd8df8d103a9.mp4" type="video/mp4" width="550" height="400" autostart="false" loop="true" controls="controls" /><br /></span></span> </p>
<h1>Title</h1>
<div class="div_class">
  <h1>Title</h1>
  <p class="p">
    Life is&nbsp;<i>like</i>&nbsp;a box of
    <b>&nbsp;chocolates</b>.
  </p>
</div>
`
const or = `<img src="/Uploads/Editor/2020-12-16/5fd8e4be1d247.jpg" alt="" /> <p>	<span><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span></span> </p><p>	<span><span style="color:#000000;"><video src="/Uploads/Editor/2020-12-16/5fd8df8d103a9.mp4" type="video/mp4" width="550" height="400" autostart="false" loop="true" controls="controls" /><br /></span></span> </p><p>	<span><span style="color:#000000;"><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span></span></span> </p><p>	<span><span style="color:#000000;"><span style="color:#000000;">图片：<img src="/Uploads/Editor/2020-12-16/5fd8e4eb7d36d.jpg" alt="" /></span></span></span></p><p>	<span><span style="color:#000000;"><span style="color:#000000;">视频：<video src="/Uploads/Editor/2020-12-16/5fd8e5029bf8b.mp4" type="video/mp4" width="550" height="400" autostart="false" loop="true" controls="controls" /></span></span></span></p><p>	<span><span style="color:#000000;"><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span><span style="color:#000000;">测试</span><br /></span></span> </p><p>	<span><span style="color:#000000;"><span style="color:#000000;"><img src="/Uploads/Editor/2020-12-15/5fd8c760da0aa.jpg" alt="" /><br /></span></span></span> </p><p>	<span><span style="color:#000000;"><span style="color:#000000;"><img src="/Uploads/Editor/2020-12-15/5fd8c6a8ce411.mp4" alt="" /><br /></span></span></span> </p>`
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
    title:'华鑫学堂',
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
