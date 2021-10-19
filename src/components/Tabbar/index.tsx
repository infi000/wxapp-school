
import Taro, {useCallback} from '@tarojs/taro';
import  { AtTabBar } from 'taro-ui';
import { Block, View } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import { logIn } from '@/utils/auth';


const Tabbar = () => {
  const {nav, currentNavIndex} = useSelector(state => state.tabbar)
  const { isLogIn } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const onClick = useCallback((tab) => {

    if(isLogIn !== 1){
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res);
          logIn({dispatch,userInfo: res.userInfo});
        }
      })
    }
    if (nav && nav.length >= tab) {
      const currTab = nav[tab];
      dispatch({type: 'tabbar/updateCurrentNavIndex', payload: tab})
    }
  }, [nav, isLogIn]);
  return <Block>
      <AtTabBar
        className='my-tab-bar'
        fixed
        current={currentNavIndex || 0}
        fontSize={10}
        iconSize={26}
        onClick={onClick}
        backgroundColor='#fff'
        selectedColor='#000'
        color='#dbdbdb'
        tabList={nav}
      />
  </Block>
}


export default Tabbar;