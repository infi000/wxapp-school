import Taro, { useDidShow, useRouter, useState } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import './index.scss';
import { AtButton, AtGrid, AtRadio } from 'taro-ui';

const answerList = [
  {
    label: 'A',
    value: 'a',
    desc: '输入框当前值，用户需要通过 onClick 事件来更新 value 值，必填',
  },
  {
    label: 'B',
    value: 'b',
    desc:
      '类是微信小程序定义的一套用于修改组件内部样式的方案。如果希望组件外样式类能够影响组件内部，可以在组件构造器中的options.addGlobalClass 字段设置为 true（Taro UI 的组件均开启了此特性）。这个特性从小程序基础库版本 2.2.3 开始支持。',
  },
  {
    label: 'C',
    value: 'c',
    desc: '类是微',
  },
  {
    label: 'D',
    value: 'd',
    desc: 'ddGlobalClass 字段设置为 t',
  },
];
const NewsDetail = () => {
  const [answer, setAnswer] = useState('');
  const router = useRouter();
  useDidShow(() => {
    const { params } = router;
    const { gid, title } = params;
    Taro.setNavigationBarTitle({
      title: title || '糖',
    });
  });
  return (
    <View className='exam-wrap'>
      <View className='exam-con'>
        <View className='con-top'>
          <View className='top-left'>判断题</View>
          <View className='top-right'>10/15</View>
        </View>
        <View className='con-mid'>
          <View className='mid-textArea'>
            1.全局样式类是微信小程序定义的一套用于修改组件内部样式的方案。如果希望组件外样式类能够影响组件内部，可以在组件构造器中的
            options.addGlobalClass 字段设置为 true（Taro UI 的组件均开启了此特性）。这个特性从小程序基础库版本 2.2.3 开始支持。
          </View>
          <View className='mid-opt'>
            {answerList.map((item) => {
              return (
                <View
                  className='mid-opt-con'
                  key={item.value}
                  onClick={() => {
                    setAnswer(item.value);
                  }}
                >
                  <View className='mid-label'>{item.label}：</View>
                  <View className='mid-desc'>{item.desc}</View>
                </View>
              );
            })}
          </View>
          <View className='mid-answer'>
            <View>正确答案： <View className='mid-label'>A</View></View>
            <View>
              解析说明： <View className='mid-desc'>全局样式类是微信小程序定义的一套用于修改组件内部样式的方案。如果希望组件外样式类能够影响组件内部，可以在组件构造器中的
              options.addGlobalClass 字段设置为 true（Taro UI 的组件均开启了此特性）。这个特性从小程序基础库版本 2.2.3 开始支持。</View>
            </View>
          </View>
        </View>
        <View className='con-bottom'>
          <View className='bottom-btn-con'>
            {/* <AtButton type='secondary' size='small'>
              按钮文案
            </AtButton> */}
          </View>
        </View>
      </View>
      <View className='exam-footer'>
        <AtGrid
          mode='square'
          hasBorder={false}
          columnNum={4}
          className='exam-grid'
          data={[
            {
              image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
              value: '返回学习',
            },
            {
              image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
              value: '查看说明',
            },
            {
              image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
              value: '上一题',
            },
            {
              image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
              value: '下一题',
            },
          ]}
        />
      </View>
    </View>
  );
};

export default NewsDetail;
