import Taro, { Component, useMemo, useRouter, useState } from '@tarojs/taro';
// 引入 WebView 组件
import { WebView } from '@tarojs/components';
const App = () => {
  const router = useRouter();
  const { params } = router;
  const { path = '' } = params || {};
  const url = useMemo(() => {
    return path ? decodeURIComponent(path) : '';
  }, [path]);
  return       <WebView src={url}  />

};

// // export default App;
// import Taro, { Component } from '@tarojs/taro'
// // 引入 WebView 组件
// import { WebView } from '@tarojs/components'
// class App extends Component {
//   render () {
//     return (
//       <WebView src='https://mp.weixin.qq.com/'  />
//     )
//   }
// }
export default App