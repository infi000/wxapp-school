// 用户认证

import Taro, { useDidShow, useState, useRouter } from '@tarojs/taro';
import { View, Block, Picker } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtList, AtListItem, AtButton, AtGrid, AtInput, AtCheckbox, AtActionSheetItem, AtImagePicker, AtRadio } from 'taro-ui';
import { postUserModify, getAreaAll,postUserCommit } from './services';
import { showSuccessToast, showErrorToast } from '@/utils/util';
import CITY_MAP from '@/constants/city';

import './index.scss';
import { SEX_MAP, UTYPE_MAP, ELEVEL_MAP, GOODTYPE_MAP, BILLTYPE_MAP, formatArr, YEAR_MAP, TONGYISHU } from '@/constants/index';
import PickerPlus from '@/components/Picker';
import MultiPicker from '@/components/MultiPicker';
import { getUserIsauth } from '@/services/user';
import TUploader from '@/components/TUploader';
import Uploader from '@/components/Uploader';



const formatCityMap = formatArr(CITY_MAP);
const formatYearMap = formatArr(YEAR_MAP);



const UserAuth = (props) => {
  Taro.setNavigationBarTitle({
    title: 'DI动力课堂',
  });
  const [formParams, setFormParams]: [any, any] = useState({});
  const [ex, setEx] = useState([{}])

  const router = useRouter();

  const dispatch = useDispatch();

  const adapter = () => {
        
    console.log("formParams", formParams);    // postUserModify(formParams).then((d) => {
    console.log("ex", ex); 
    const format = {...formParams}
    if(Array.isArray(formParams.goodtype)){
      format.goodtype = formParams.goodtype.join(',');
    }
    if(Array.isArray(ex)){
    const experienceyear =  ex.map(item => item.experienceyear);
    const experiencetype =  ex.map(item => item.experiencetype);
    console.log(experienceyear, experiencetype);
    if(Array.isArray(experiencetype) && experiencetype[0]){
      format.experiencetype = experiencetype.join(',');
    }
    if(Array.isArray(experienceyear) && experienceyear[0]){
      format.experienceyear = experienceyear.join(',');
    }
    }
    console.log('format', format);
    return format;
  }

  const handleUpdateForm = (params, type) => {
    console.log(params);
    // experienceyear
    // experiencetype
    setFormParams((opt) => {
      opt[type] = params;
      return opt;
    });
  };

  const handleEx = (params, type, index) => {
    const newEx =[...ex];
    newEx[index][type] = params;
    setEx([...newEx])
  }

  const handleSubmite = () => {
    const params = adapter();
    postUserCommit(params).then((d) => {
      showSuccessToast('提交成功');
      getUserIsauth().then((d) => {
        dispatch({ type: 'main/updateUserIsAuth', payload: d });
      }).catch((err) => {
        console.log(err);
      });
      setTimeout(() => {
        Taro.navigateTo({
          url: '/pages/Main/index',
        });
      }, 500);
    });
  };

  const handleDownLoad = () => {
    Taro.downloadFile({
      url: TONGYISHU,
      success(res) {
        console.log("res", res);
        const filePath = res.tempFilePath;
        console.log(filePath);
        Taro.openDocument({
          filePath,
          success(res) {
            console.log('打开文档成功');
          },
        });
      },
    });
  }
  useDidShow(() => {
    const { params } = router;
    const { cid = 1 } = params || {};
  });

  // const handleChooose = () => {
  //   wx.chooseImage({
  //     success (res) {
  //       console.log('chooseImage', res);
  //       const tempFilePaths = res.tempFilePaths
  //       wx.uploadFile({
  //         url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
  //         filePath: tempFilePaths[0],
  //         name: 'file',
  //         formData: {
  //           'user': 'test'
  //         },
  //         success (res){
  //           console.log('uploadFile', res);
  //           const data = res.data
  //           //do something
  //         }
  //       })
  //     }
  //   })
  // }
  return (
    <View className='baseWrap'>
      <PickerPlus title='用户类型(必填)' range={UTYPE_MAP} onChange={(e) => handleUpdateForm(e, 'utype')}  />
      <PickerPlus title='省(必填)' range={formatCityMap} onChange={(e) => handleUpdateForm(e, 'province')}   />
      <AtInput name='value' title='市(必填)' type='text' onChange={(e) => handleUpdateForm(e, 'city')} placeholder='请输入' />
      <AtInput name='value' title='单位(必填)' type='text' onChange={(e) => handleUpdateForm(e, 'companyname')}  placeholder='请输入'/>
      <AtInput name='value' title='姓名(必填)' type='text' onChange={(e) => handleUpdateForm(e, 'realname')} placeholder='请输入' />
      <PickerPlus title='性别(必填)' range={SEX_MAP} onChange={(e) => handleUpdateForm(e, 'sex')} />
      <AtInput name='value' title='职务' type='text' onChange={(e) => handleUpdateForm(e, 'jobtitle')} placeholder='请输入' />
      <AtInput name='value' title='手机(必填)' type='number' onChange={(e) => handleUpdateForm(e, 'phone')} placeholder='请输入' />
      <AtInput name='value' title='身份证' type='idcard' onChange={(e) => handleUpdateForm(e, 'card')} placeholder='请输入'/>
      <AtInput name='value' title='邮箱(必填)' type='text' onChange={(e) => handleUpdateForm(e, 'mail')} placeholder='请输入' />
      <PickerPlus title='英语水平(必填)' range={ELEVEL_MAP} onChange={(e) => handleUpdateForm(e, 'englevel')} />
      <AtInput name='value' title='专业特长' type='text' onChange={(e) => handleUpdateForm(e, 'specialty')} placeholder='请输入' />
      <View className='Multi-title'>认证经历(必填):</View>

      {
        ex.map((item, index) => (
          <Block key={index}>
            <PickerPlus title='认证年份' range={formatYearMap} onChange={(e) => handleEx(e, 'experienceyear', index)} />
            <PickerPlus title='认证类型' range={UTYPE_MAP} onChange={(e) => handleEx(e, 'experiencetype', index)} />
          </Block>
        ))
      }
      { ex.length < 4 && <AtButton  type='secondary' size='small' onClick={() => setEx(opt => { opt.push({}); return [...opt] })}> 添加一段认证经历</AtButton>}
      { ex.length > 1 && <AtButton  size='small' onClick={() => setEx(opt => { opt.pop(); return [...opt] })}> 删除认证经历</AtButton>}
      <AtInput name='value' title='学历' type='text' onChange={(e) => handleUpdateForm(e, 'education')}  placeholder='请输入'/>
      <PickerPlus title='发票种类' range={BILLTYPE_MAP} onChange={(e) => handleUpdateForm(e, 'billtype')} />
      <AtInput name='value' title='开票抬头' type='text' onChange={(e) => handleUpdateForm(e, 'company')} placeholder='请输入' />
      <AtInput name='value' title='开票税号' type='text' onChange={(e) => handleUpdateForm(e, 'companycode')} placeholder='请输入' />
      <AtInput name='value' title='发票内容' type='text' onChange={(e) => handleUpdateForm(e, 'billdetail')} placeholder='请输入' />
      <AtInput name='value' title='开票金额' type='number' onChange={(e) => handleUpdateForm(e, 'money')} placeholder='请输入' />
      <View className='Multi-title'>照片上传(必填):</View>
      <Uploader length={1} uploadSucc={(e) => handleUpdateForm( e, 'photo')} />
      {/* <AtImagePicker
       onChange={(files) => handleUpdateForm( files[0].file, 'photo')}
      /> */}
       <View className='Multi-title'>肖像授权同意书(必填):</View>
       <Uploader length={1} uploadSucc={(e) => handleUpdateForm( e, 'portraitureright')} />
      {/* <AtImagePicker
       onChange={(files) => handleUpdateForm( files[0].url, 'portraitureright')}
      /> */}
      <AtButton type='secondary'  size='small' onClick={handleDownLoad}>下载DI肖像权免追究同意书</AtButton>
      <AtInput name='value' title='备注' type='text' onChange={(e) => handleUpdateForm(e, 'remarks')} placeholder='请输入'/>
      <MultiPicker title='擅长DI类型(必填)' range={GOODTYPE_MAP} onChange={(e) => handleUpdateForm(e, 'goodtype')} />

      {/* <View>
        身份证
        <Uploader length={3} />
      </View> */}
  

      <AtButton type='primary' size='small' onClick={handleSubmite}>
        提交
      </AtButton>
    </View>
  );
};

export default UserAuth;
