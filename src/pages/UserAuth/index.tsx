// 用户认证

import Taro, { useDidShow, useState, useRouter } from '@tarojs/taro';
import { View, Block, Picker, Checkbox } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtList, AtListItem, AtButton, AtGrid, AtInput, AtCheckbox, AtActionSheetItem, AtImagePicker, AtRadio } from 'taro-ui';
import { postUserModify, getAreaAll, postUserCommit } from './services';
import { showSuccessToast, showErrorToast, showToast } from '@/utils/util';
import CITY_MAP from '@/constants/city';
import './index.scss';
import { SEX_MAP, UTYPE_MAP, ELEVEL_MAP, GOODTYPE_MAP, BILLTYPE_MAP, formatArr, YEAR_MAP, TONGYISHU } from '@/constants/index';
import PickerPlus from '@/components/Picker';
import MultiPicker from '@/components/MultiPicker';
import { getUserIsauth } from '@/services/user';
import Uploader from '@/components/Uploader';



const formatCityMap = formatArr(CITY_MAP);
const formatYearMap = formatArr(YEAR_MAP);

const check = (params: Array<string>, target: Record<string, string>) => {

  const res = params.find(key => !target[key]);
  return res ? false : true;
}


const UserAuth = (props) => {
  Taro.setNavigationBarTitle({
    title: 'DI动力课堂',
  });
  const [formParams, setFormParams]: [any, any] = useState({});
  const [ex, setEx] = useState([{}]);
  const [exChoose, setExChoose] = useState('1');
  const [step, setStep] = useState(1);
  const [sq, setSq] = useState(false);//授权书同意
  const router = useRouter();

  const dispatch = useDispatch();

  const adapter = () => {

    console.log("formParams", formParams);    // postUserModify(formParams).then((d) => {
    console.log("ex", ex);
    const format = { ...formParams }
    if (Array.isArray(formParams.goodtype)) {
      format.goodtype = formParams.goodtype.join(',');
    }
    if (exChoose == '1' && Array.isArray(ex) && ex.length > 0) {
      const experienceyear = ex.map(item => item.experienceyear);
      const experiencetype = ex.map(item => item.experiencetype);
      console.log(experienceyear, experiencetype);
      if (Array.isArray(experiencetype) && experiencetype[0]) {
        format.experiencetype = experiencetype.join(',');
      }
      if (Array.isArray(experienceyear) && experienceyear[0]) {
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
    const newEx = [...ex];
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

  const handleChagneEx = (e) => {
    setExChoose(e);
    if (e == '-1') {
      // 无
      setEx([]);
    } else {
      setEx([{}]);
    }
    console.log(e);
  }

  // 下一步
  const handleNextStep = (e) => {
    // setStep((e) => ++e)
    //     return
    // console.log('formParams', formParams);
    if (step === 2) {
      // setStep((e) => ++e)
      // return
      if (check(['province', 'city', 'companyname', 'realname', 'sex', 'phone'], formParams)) {
        setStep((e) => ++e)
      } else {
        showToast('请填写必填项')
      }

    }
    if (step === 3) {
      // setStep((e) => ++e)
      // return
      if (check(['mail', 'englevel', 'goodtype'], formParams)) {
        setStep((e) => ++e)
      } else {
        showToast('请填写必填项')
      }
    }
    if (step === 1) {
      if (sq) {
        setStep((e) => ++e)
      } else {
        showToast('请同意')
      }
    }
  }
  // 上一步
  const handleLastStep = () => {

  }

  useDidShow(() => {
    const { params } = router;
    const { cid = 1 } = params || {};
  });
  return (
    <View className='baseWrap'>
      {
        step == 1 && <Block>

          {/* <Uploader length={1} uploadSucc={(e) => handleUpdateForm(e, 'portraitureright')} /> */}
          {/* <AtButton type='secondary' size='small' onClick={handleDownLoad}>下载DI肖像权免追究同意书</AtButton> */}
          <View className='at-article__h1'>
            DI动力课堂小程序隐私保护指引
  </View>
          <View className='at-article__p'>

            本指引是DI动力课堂小程序开发者 "目的地想象(北京)教育咨询有限公司"（以下简称“开发者”）为处理你的个人信息而制定。
</View>
          <View className='at-article__p'>


            1.开发者处理的信息
            根据法律规定，开发者仅处理实现小程序功能所必要的信息。

            为了提供DI领队、DI裁判实名认证，推送培训资料，开发者将在获取你的明示同意后，收集你的微信昵称、头像。
            为了电话验证你的身份，填写快递收件人信息，开发者将在获取你的明示同意后，收集你的手机号。
            为了将电子版证书下载到您的手机，开发者将在获取你的明示同意后，使用你的相册（仅写入）权限。
            开发者 收集你的身份证号码，用于实名认证，颁发证书。

            开发者 收集你的所关注账号，用于推送认证消息和资料。

            开发者 收集你的订单信息，用于核实订单和支付信息，核实发票。

            开发者 收集你的地址，用于快递证书。
            </View>
          <View className='at-article__p'>


            2.你的权益
            2.1关于使用你的相册（仅写入）权限，你可以通过以下路径：小程序主页右上角“…”—“设置”—点击特定信息—点击“不允许”，撤回对开发者的授权。

            2.2关于收集你的微信昵称、头像、收集你的微信昵称、头像、收集你的手机号、收集你的地址，你可以通过以下路径：小程序主页右上角“...” — “设置” — “小程序已获取的信息” — 点击特定信息 — 点击“通知开发者删除”，开发者承诺收到通知后将删除信息。

            关于你的个人信息，你可以通过以下方式与开发者联系，行使查阅、复制、更正、删除等法定权利。

            电话:18611628220
          </View>
          <View className='at-article__p'>

            3.开发者对信息的存储
            开发者承诺，除法律法规另有规定外，开发者对你的信息的保存期限应当为实现处理目的所必要的最短时间。
            </View>
          <View className='at-article__p'>
            4.信息的使用规则
            4.1开发者将会在本指引所明示的用途内使用收集的信息

            4.2如开发者使用你的信息超出本指引目的或合理范围，开发者必须在变更使用目的或范围前，再次以电话方式告知并征得你的明示同意。
           </View>
          <View className='at-article__p'>
            5.信息对外提供
            5.1开发者承诺，不会主动共享或转让你的信息至任何第三方，如存在确需共享或转让时，开发者应当直接征得或确认第三方征得你的单独同意。

            5.2开发者承诺，不会对外公开披露你的信息，如必须公开披露时，开发者应当向你告知公开披露的目的、披露信息的类型及可能涉及的信息，并征得你的单独同意。
    </View>
          <View className='at-article__p'>
            6.你认为开发者未遵守上述约定，或有其他的投诉建议、或未成年人个人信息保护相关问题，可通过以下方式与开发者联系；或者向微信进行投诉。
            电话 : 18611628220

            更新日期：2021-11-29

            生效日期：2021-11-29
   </View>
          <View className='at-article__p'>
            我作为在此表格上登记的人，完全代表个人意愿，决定毫无保留的同意DI中国区将认证领队、认证裁判、认证讲师、认证ACM的信息、照片/视频公开传播，但此目的仅局限于推广宣传DI项目。
            我放弃检查或同意与照片和视频有关的任何社论的文字内容，并不追究DI中国区以及使用该照片和视频所引起的所有赔偿问题，包括毁谤、侵犯隐私、或其他侵权行为。我也同意不提出强制令救济和/或任何人的经济损失的赔 偿要求。
            我已经阅读过上述内容。我完全了解此同意书的内容并在以下签字确认。我已年满十八岁并且有法律能力签署此文件。

      </View>
          <View className='Multi-title'>DI动力课堂小程序隐私保护指(必填):<Checkbox value='选中' checked={sq} onClick={() => setSq(i => !i)} style='margin-left: 20rpx' >同意</Checkbox></View>


        </Block>
      }
      {
        step == 2 && <Block>
          <PickerPlus title='省(必填)' range={formatCityMap} onChange={(e) => handleUpdateForm(e, 'province')} />
          <View className='small'>用于审核归属组委或用于快递地址</View>
          <AtInput name='value' title='市/区(必填)' type='text' onChange={(e) => handleUpdateForm(e, 'city')} placeholder='请输入' />
          <View className='small'>用于审核归属组委或用于快递地址</View>
          <AtInput name='value' title='单位(必填)' type='text' onChange={(e) => handleUpdateForm(e, 'companyname')} placeholder='请输入' />
          <View className='small'>用于审核归属组委或用于快递地址</View>
          <AtInput name='value' title='姓名(必填)' type='text' onChange={(e) => handleUpdateForm(e, 'realname')} placeholder='证书授予的姓名' />
          <View className='small'>用于证书授予的姓名</View>
          <AtInput name='value' title='英文名' type='text' onChange={(e) => handleUpdateForm(e, 'ename')} placeholder='证书授予的英文姓名,可用拼音' />
          <View className='small'>用于合成英文证书姓名</View>
          <PickerPlus title='性别(必填)' range={SEX_MAP} onChange={(e) => handleUpdateForm(e, 'sex')} />
          <View className='small'>用于会议分配房间</View>
          <AtInput name='value' title='职务' type='text' onChange={(e) => handleUpdateForm(e, 'jobtitle')} placeholder='请输入' />
          <View className='small'>用于资料审核，开展线下活动</View>
          <AtInput name='value' title='手机(必填)' type='number' onChange={(e) => handleUpdateForm(e, 'phone')} placeholder='请输入' />
          <View className='small'>用于实名验证或快递收件人联系方式</View>
          <AtInput name='value' title='身份证' type='idcard' onChange={(e) => handleUpdateForm(e, 'card')} placeholder='请输入' />
          <View className='small'>用于会议预定房间</View>

          {/* <View className='Multi-title'>照片上传(必填，证书授予照片，免冠证件照):</View>
          <Uploader length={1} uploadSucc={(e) => handleUpdateForm(e, 'photo')} /> */}
        </Block>
      }
      {
        step == 3 && <Block>
          {/* <PickerPlus title='认证类型' range={UTYPE_MAP} onChange={(e) => handleUpdateForm(e, 'utype')} /> */}
          <AtInput name='value' title='邮箱(必填)' type='text' onChange={(e) => handleUpdateForm(e, 'mail')} placeholder='请输入' />
          <PickerPlus title='英语水平(必填)' range={ELEVEL_MAP} onChange={(e) => handleUpdateForm(e, 'englevel')} />
          <AtInput name='value' title='专业特长' type='text' onChange={(e) => handleUpdateForm(e, 'specialty')} placeholder='请输入' />
          <MultiPicker title='擅长DI类型(必填)' range={GOODTYPE_MAP} onChange={(e) => handleUpdateForm(e, 'goodtype')} />
          <View className='Multi-title'>认证经历:</View>
          <AtRadio
            options={[
              { label: '无', value: '-1', desc: '无认证经历' },
              { label: '有', value: '1', desc: '有认证经历' },
            ]}
            value={exChoose}
            onClick={handleChagneEx}
          />

          {
            exChoose == '1' && ex.map((item, index) => (
              <Block key={index}>
                <PickerPlus title='认证年份' range={formatYearMap} onChange={(e) => handleEx(e, 'experienceyear', index)} />
                <PickerPlus title='认证类型' range={UTYPE_MAP} onChange={(e) => handleEx(e, 'experiencetype', index)} />
              </Block>
            ))
          }
          {exChoose == '1' && ex.length < 4 && <AtButton type='secondary' size='small' onClick={() => setEx(opt => { opt.push({}); return [...opt] })}> 添加一段认证经历</AtButton>}
          {exChoose == '1' && ex.length > 1 && <AtButton size='small' onClick={() => setEx(opt => { opt.pop(); return [...opt] })}> 删除认证经历</AtButton>}
          <AtInput name='value' title='学历' type='text' onChange={(e) => handleUpdateForm(e, 'education')} placeholder='请输入' />
        </Block>
      }

      {
        step == 4 && <Block>
          <PickerPlus title='发票种类' range={BILLTYPE_MAP} onChange={(e) => handleUpdateForm(e, 'billtype')} />
          <AtInput name='value' title='开票抬头' type='text' onChange={(e) => handleUpdateForm(e, 'company')} placeholder='请输入' />
          <AtInput name='value' title='开票税号' type='text' onChange={(e) => handleUpdateForm(e, 'companycode')} placeholder='请输入' />
          <AtInput name='value' title='发票内容' type='text' onChange={(e) => handleUpdateForm(e, 'billdetail')} placeholder='请输入' />
          <AtInput name='value' title='开票金额' type='number' onChange={(e) => handleUpdateForm(e, 'money')} placeholder='请输入' />
          <AtInput name='value' title='备注' type='text' onChange={(e) => handleUpdateForm(e, 'remarks')} placeholder='请输入' />
        </Block>
      }
      {/* {
        step !== 1 && <AtButton className='btnStep' customStyle={{ 'paddingBottom': '20px' }} type='primary' size='small' onClick={() => setStep((e) => --e)}>上一页 </AtButton>
      } */}
      {
        step !== 4 && <AtButton className='btnStep' customStyle={{ 'paddingBottom': '20px' }} type='primary' size='small' onClick={handleNextStep}> 下一页 </AtButton>
      }
      {
        step == 4 && <AtButton className='btnStep' customStyle={{ 'paddingBottom': '20px' }} type='primary' size='small' onClick={handleSubmite}>
          提交
      </AtButton>
      }


    </View>
  );
};

export default UserAuth;
