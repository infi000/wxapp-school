import Taro from '@tarojs/taro';
import { View, Button, Block } from '@tarojs/components';
import { AtAvatar, AtGrid } from 'taro-ui';
import { useSelector, useDispatch } from '@tarojs/redux';
import { logIn } from '@/utils/auth';
import '../index.scss';
const MyAvatar = () => {
  const { isLogIn, wxUserInfo } = useSelector((state:any) => state.main);
  const dispatch = useDispatch();
  const handleLogIn = (e) => {
    console.log(e);
    logIn(dispatch);
  };
  const handleChoose = (item) =>{
    console.log(item);
    const { path } = item;
    if (path) {
      Taro.navigateTo({ url: path});
    }
  }
  return (
    <View className='my-avatar-con'>
      <View className='at-row at-row__align--center  my-avatar-top'>
        {isLogIn ? (
          <Block>
            <View className='at-col  at-col-3'>
              <AtAvatar circle image={wxUserInfo.avatarUrl}></AtAvatar>
            </View>
            <View className='at-col'>{wxUserInfo.nickName}</View>
          </Block>
        ) : (
          <Button open-type='getUserInfo' onGetUserInfo={handleLogIn}>
            授权登录
          </Button>
        )}
      </View>
      <AtGrid
        className='avatar-gird'
        hasBorder={false}
        columnNum={4}
        onClick={handleChoose}
        data={[
          {
            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
            value: '我的考试',
          },
          {
            image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
            value: '名次排行',
          },
          {
            image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
            value: '我的证书',
          },
          {
            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
            value: '我的收藏',
            type: 'myCollect',
            path: '/pages/MyCollect/index'
          },
          {
            image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
            value: '上传列表',
          },
          {
            image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
            value: '我的信息',
          },
          {
            image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
            value: '抖音内容',
          },
          {
            image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
            value: '我的积分',
          },
        ]}
      />
    </View>
  );
};

export default MyAvatar;
