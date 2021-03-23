import Taro, { useDidShow, useMemo, useRouter, useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { getScorepos, getAreapos } from './services';
import './index.scss';
import { isArray } from 'lodash';

const MeRanking = () => {
  const router = useRouter();
  const [ranking, setRanking ] = useState([]);
  const [areaPos, setAreaPos ] = useState<{id:string;aname:string;areascore:string}[]>([]);
  const [tab, setTab] = useState<'total' | 'area'>('total');
  const [uid, setUid ] = useState('');

  useDidShow(() => {
    const { params } = router;
    Taro.setNavigationBarTitle({
      title: '热线学堂',
    });
    getScorepos().then((d) => {
     d.scores && setRanking(d.scores);
      d.uid && setUid(d.uid);
    })
    getAreapos().then((d) => {
     d.scores && setAreaPos(d.scores);
      d.uid && setUid(d.uid);
    })
  });
  const myRank = useMemo(()=>{
    let res:any = {};
    if(isArray(ranking) && ranking.length > 0 && uid){
      const index = ranking.findIndex((d:any)=> d.id == uid);
      const findRes = ranking.find((d:any)=> d.id == uid);
      if(findRes && index){
        res = findRes;
        res.index = index+1;
      }
    }
    return res;
  },[ranking,uid])
  const handleChange = (params:'total' | 'area') => {
    setTab(params)
  }
  return (
    <View className='meranking-wrap'>
      <View className='meranking-tab'>
        <View className='at-row at-row__justify--between'>
          <View className={`at-col at-col-6 ${tab =='total' ? 'meranking-tab-choosed' : ''}`}  onClick={() => handleChange('total')}>总排行</View>
          <View className={`at-col at-col-6 ${tab =='area' ? 'meranking-tab-choosed' : ''}`} onClick={() => handleChange('area')}>地区排行</View>
        </View>
      </View>
      <View className='meranking-top'>
        <View className='at-row at-row__justify--between '>
          <View className='at-col at-col-3'>名次：{myRank.index}</View>
          <View className='at-col at-col-6'>姓名：{myRank.uname}</View>
          <View className='at-col at-col-3'>分数：{myRank.score}</View>
        </View>
      </View>
      {
         tab =='total' && <View className='meranking-mid'>
         <View className='meranking-con'>
           {isArray(ranking) && ranking.length> 0 ? ranking.map((item:any,index) => (
             <View className='at-row at-row__justify--between meranking-line' key={item.id}>
               <View className='at-col at-col-2 meranking-line-l'>{index+1}</View>
               <View className='at-col at-col-8 meranking-line-m' style={uid == item.id?{color:'blue',fontWeight:'bold'}:{}}>{item.uname}</View>
               <View className='at-col at-col-2 meranking-line-r'>{item.score}</View>
             </View>
           )) : '暂无数据'}
         </View>
         <View className='meranking-mid-bottom'>排名：{myRank.index}</View>
       </View>
      }
      { tab == 'area' && <View className='meranking-mid'>
        <View className='meranking-con'>
          {isArray(areaPos) && areaPos.length> 0 ? areaPos.map((item,index) => (
            <View className='at-row at-row__justify--between meranking-line' key={item.id}>
              <View className='at-col at-col-2 meranking-line-l'>{index+1}</View>
              <View className='at-col at-col-8 meranking-line-m'>{item.aname}</View>
              <View className='at-col at-col-2 meranking-line-r'>{item.areascore}</View>
            </View>
          )) : '暂无数据'}
        </View>
        <View className='meranking-mid-bottom'>排名：{myRank.index}</View>
      </View>}
    </View>
  );
};

export default MeRanking;
