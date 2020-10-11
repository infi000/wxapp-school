import Taro, { useDidShow, useState, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { ListItemCon } from '@/components/ListCon';
import TitleCon from '@/components/TitleCon';
import { defaultFace } from '@/static/images/index';
import { AtTag } from 'taro-ui';
import { getCourseHotcourse, addCourseAttcourse } from '../services';
import '../index.scss';
import { showSuccessToast } from '@/utils/util';

const RecommendClass = () => {
  const [hotClass, setHotClass] = useState([]);
  const handleToClass = (opt) => {
    const { id } = opt;
    Taro.navigateTo({ url: '/pages/ClassDetail/index?id=' + id });
  };
  // const listInfo = [
  //   {
  //     id: '1',
  //     image: defaultFace,
  //     title: '职场中最高的自律，是放弃不断改变',
  //     child: {
  //       left: '王益胃',
  //       mid: '直播：10:00',
  //       right: '预约',
  //     },
  //   },
  //   {
  //     id: '2',
  //     image: defaultFace,
  //     title: '职场中最高的自律，是放弃不断改变，是放弃不断改变',
  //     child: {
  //       left: '王益胃',
  //       mid: '直播：10:00',
  //       right: '预约',
  //     },
  //   },
  // ];
  const handleAddCourseAttcourse = (cid) =>{
    addCourseAttcourse({cid}).then(d=>{
      showSuccessToast(d);
    });
    getCourseHotcourse({count:4}).then(d=>{
      d.courses && setHotClass(d.courses);
    }).catch(e =>{
      console.log(e);
    })
  }
  useEffect(() => {
    getCourseHotcourse({count:4}).then(d=>{
      d.courses && setHotClass(d.courses);
    }).catch(e =>{
      console.log(e);
    })
  },[]);
  return (
    <View className='recommendClass-wrap'>
      <TitleCon title='课程推荐' />
      <View>
        {hotClass.map((item) => {
          const { cover, cname, id,cid,starttime } = item;
          return (
            <View className='recommendClass-list-item' key={id}>
              <ListItemCon image={cover} title={cname}  onClick={() => handleToClass(item)}>
                <View className='at-row at-row__justify--between'>
                  {/* <View className='at-col at-col-1'></View> */}
                  <View className='at-col at-col-7'>开始时间:{starttime}</View>
                  <View className='at-col at-col-5 textR'>
                    <AtTag size='small' type='primary' circle onClick={()=>handleAddCourseAttcourse(cid)}>
                     订阅
                    </AtTag>
                  </View>
                </View>
              </ListItemCon>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default RecommendClass;
