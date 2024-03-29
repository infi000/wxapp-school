/* eslint-disable no-undef */
import Taro, { Component } from '@tarojs/taro';
import { Provider, connect } from '@tarojs/redux';
import dva from './dva';
import models from './store';
// import { ROUTER_MAP } from './router';
import { set as setGlobalData, get as getGlobalData } from './global_data';
import { getScorepos, getUserIsauth, getOpenId, isopencertification, postUserClock } from '@/services/user';
import { isArray } from 'lodash';
import Index from './pages/index';

// import configStore from './store'
import './app.scss';
// import './app.less';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

// const store = configStore()

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e, dispatch) {
    console.log('系统出错了!');
    console.log(e);
    // dispatch(action("sys/error", e));
  },
});
const store = dvaApp.getStore();

// console.log("Object.values(ROUTER_MAP)",ROUTER_MAP.map(item=>item.path));
@connect(({ main }) => ({
  ...main,
}))
class App extends Component {
  async componentWillMount() {

    this.update();
    this.init();
    const { dispatch } = this.props;
    // 这块的逻辑就是为了过审核

    const fekeOpenid = await getOpenId();
    if (fekeOpenid) {
      setGlobalData('FAKE_OPENID', fekeOpenid);
      dispatch({ type: 'main/updateIsLogIn', payload: 1 });
      dispatch({ type: 'main/updateWxUserInfo', payload: {} });
      dispatch({ type: 'main/updateOpenid', payload: fekeOpenid });
      getScorepos()
        .then((d) => {
          const { uid, scores } = d || {};
          if (uid && isArray(scores)) {
            dispatch({ type: 'main/updateUserScoreInfo', payload: d });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      getUserIsauth()
        .then((d) => {
          dispatch({ type: 'main/updateUserIsAuth', payload: d });
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    Taro.checkSession({
      success(res) {
        dispatch({ type: 'main/updateIsLogIn', payload: 1 });
        //session_key 未过期，并且在本生命周期一直有效
        Taro.getStorage({
          key: 'wxUserInfo',
          success: function(res) {
            console.log("getStorage:succ",res);
            const wxUserInfo = res.data;
            dispatch({ type: 'main/updateIsLogIn', payload: 1 });
            dispatch({ type: 'main/updateWxUserInfo', payload: wxUserInfo });
            dispatch({ type: 'main/updateOpenid', payload: wxUserInfo.openid });
          },fail(err){
            console.log("getStorage:err",res);
            dispatch({ type: 'main/updateIsLogIn', payload: 2 });
            console.log('session验证未登陆！');
            Taro.removeStorageSync('wxUserInfo');
          },
        });
        getScorepos()
          .then((d) => {
            const { uid, scores } = d || {};
            if (uid && isArray(scores)) {
              dispatch({ type: 'main/updateUserScoreInfo', payload: d });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        getUserIsauth()
          .then((d) => {
            dispatch({ type: 'main/updateUserIsAuth', payload: d });
          })
          .catch((err) => {
            console.log(err);
          });
      },
      fail() {
        dispatch({ type: 'main/updateIsLogIn', payload: 2 });
        console.log('session验证未登陆！');
        Taro.removeStorageSync('wxUserInfo');
      },
    });
    this.update();
    postUserClock();
  }
  config = {
    pages: [

    
 
      'pages/Main/index',
      'pages/Login/index',
      'pages/BannerDetail/index',
      'pages/ExamClass/index',

      'pages/UserAuth/index',

      'pages/Live/index',

      'pages/MeRanking/index',
      'pages/Feedback/index',
 
      'pages/ClassPlay/index',
      'pages/TestResult/index',
      'pages/NewExamDetail/components/Result',
 
      'pages/WebView/index',

      'pages/ClassList/index',
      'pages/HelpCenter/index',
      'pages/LearnHistory/index',
      'pages/ClassDetail/Componets/ExamTest',
      'pages/ClassDetail/Componets/ClassImg',

      'pages/ClassDetail/index',
      'pages/NewExamDetail/index',


      'pages/TestClass/index',

      'pages/Mycert/index',
      'pages/MyCollect/components/Courseware',

      'pages/MyCollect/components/News',

      'pages/MyCollect/components/Course',

      'pages/MyCollect/index',
      'pages/MyScore/index',
      'pages/NewsDetail/index',

    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
    // tabBar: {
    //   'custom': false,
    //   // 'backgroundColor': '#fafafa',
    //   // 'borderStyle': 'white',
    //   // 'selectedColor': '#AB956D',
    //   // 'color': '#666',
    //   'list': [
    //     {
    //       'pagePath':'pages/GoodGoods/index',
    //       // "iconPath": './static/images/home.png',
    //       // "selectedIconPath": './static/images/home@selected.png',
    //       'text': '首页',
    //     },
    //     {
    //       'pagePath':  'pages/Me/index',
    //       // "iconPath": './static/images/my.png',
    //       // "selectedIconPath": './static/images/my@selected.png',
    //       'text': '个人',
    //     },
    //   ],
    // },
    subpackages: [
      // {
      //   root: 'pages/ExamClass',
      //   name: 'ExamClass',
      //   pages: [
      //     'index',
      //   ],
      // },
      // {
      //   root: 'pages/ExamDetail',
      //   name: 'ExamDetail',
      //   pages: [
      //     'index',
      //   ],
      // },
      {
        root: 'pages/HotNews',
        name: 'HotNews',
        pages: ['index'],
      },
      // {
      //   root: 'pages/NewsDetail',
      //   name: 'NewsDetail',
      //   pages: [

      //     'index',
      //   ],
      // },
      // {
      //   root: 'pages/ClassPlay',
      //   name: 'ClassPlay',
      //   pages: [
      //     'index',
      //   ],
      // },
    ],
    'networkTimeout': {
      'request': 10000,
      'downloadFile': 10000,
    },
    'enablePullDownRefresh': true,
    'debug': true,
    'enableShareTimeline': true,
    'enableShareAppMessage': true,
  };

  init = () => {
    console.log('初始化了')
    const { dispatch } = this.props;
    isopencertification().then(d => {
      console.log("ddddddd",d)
      dispatch({ type: 'main/updateIsShowMe', payload: d });
    });

  };

  update = () => {
    if (process.env.TARO_ENV === 'weapp') {
      const updateManager = Taro.getUpdateManager();
      Taro.getUpdateManager().onUpdateReady(function() {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          },
        });
      });
    }
  };

  componentDidShow() {
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
      success:(res) => {
        // console.log("分享啦", res);
        // postUserShare({stype:7})
      }
    });
    // user
    //   .checkLogin()
    //   .then((res) => {
    //     setGlobalData('hasLogin', true);
    //   })
    //   .catch(() => {
    //     setGlobalData('hasLogin', false);
    //   });

    // wx.onShareAppMessage: function() {
    //   wx.showShareMenu({
    //       withShareTicket: true,
    //       menus: ['shareAppMessage', 'shareTimeline']
    //     })
    // },
    // //用户点击右上角分享朋友圈
    // wx.onShareTimeline(function () {
    //   console.log('分享拉@@@@@');
    //   return {
    //       title: 'we',
    //     }
    // });
 
    // Taro.useShareAppMessage(res => {
    //   return {
    //     title: 'DI动力课堂',
    //     path: '/pages/Main/index',
    //     // imageUrl
    //   }
    // })
  }

  componentDidHide() {}

  componentDidCatchError() {}
  onShareTimeline(){
    return{
     
        title:'分享',

    }
}

 onShareAppMessage()
 {
     return{
         title:'点击转发后,页面文章的标题',
     }
 }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
