import Taro, { Component } from '@tarojs/taro';
import { Provider, connect } from '@tarojs/redux';
import dva from './dva';
import models from './store';
// import { ROUTER_MAP } from './router';
import { set as setGlobalData, get as getGlobalData } from './global_data';
import { getScorepos,getUserIsauth } from '@/services/user';
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
  componentWillMount() {
    this.update();
    const { dispatch } = this.props;
    Taro.checkSession({
      success(res) {
        //session_key 未过期，并且在本生命周期一直有效
        Taro.getStorage({
          key: 'wxUserInfo',
          success: function(res) {
            const wxUserInfo = res.data;
            dispatch({ type: 'main/updateIsLogIn', payload: true });
            dispatch({ type: 'main/updateWxUserInfo', payload: wxUserInfo });
            dispatch({ type: 'main/updateOpenid', payload: wxUserInfo.openid });
          },
        });
        getScorepos()
        .then((d) => {
          const { uid, scores } = d ||{};
          if(uid && isArray(scores)){  
            dispatch({ type: 'main/updateUserScoreInfo', payload: d });
          }
        })
        .catch((err) => {
          console.log(err);
        });
        getUserIsauth().then((d)=>{
          dispatch({ type: 'main/updateUserIsAuth', payload: d });
        }) .catch((err) => {
          console.log(err);
        });
      },
      fail() {
        console.log('session验证未登陆！');
        Taro.removeStorageSync('wxUserInfo');
      },
    });
    this.update();
  }
  config = {
    pages: [


      'pages/Main/index',
      'pages/ClassPlay/index',
    
      'pages/NewExamDetail/components/Result',

      'pages/WebView/index',
      'pages/UserAuth/index',

      'pages/MeRanking/index',
      'pages/HelpCenter/index',
      'pages/LearnHistory/index',
      'pages/ClassDetail/Componets/ExamTest',
      'pages/ClassDetail/Componets/ClassImg',

      'pages/ClassDetail/index',
      'pages/NewExamDetail/index',

      'pages/ExamClass/index',
      'pages/TestClass/index',
      'pages/TestResult/index',
      'pages/Mycert/index',
      'pages/MyCollect/components/Courseware',
   
      'pages/MyCollect/components/News',
     

      'pages/MyCollect/components/Course',

      'pages/MyCollect/index',

   
    
     
      //  'pages/ClassPlay/index',
         'pages/NewsDetail/index',
      // 'pages/HotNews/index',
      // 'pages/ExamDetail/index',
      // 'pages/ExamClass/index',
      // 'pages/Me/index',
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
        pages: [
          'index',
        ],
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
    // user
    //   .checkLogin()
    //   .then((res) => {
    //     setGlobalData('hasLogin', true);
    //   })
    //   .catch(() => {
    //     setGlobalData('hasLogin', false);
    //   });
  }

  componentDidHide() {}

  componentDidCatchError() {}

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
