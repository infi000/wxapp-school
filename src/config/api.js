const MOCK = 'http://easy-mock.sftcwl.com/mock/5f6a20a67266ef5678785185/wxschool';
const yjw_test = 'https://xch.xuexiao.ntof.club/index.php/MiniApi';
const WxApiRoot = yjw_test;
export default {
  getJscode2session: WxApiRoot + '/User/jscode2session', // 29、	小程序登录更新session
  saveUserData: WxApiRoot + '/User/saveuserdata', // 30、	添加小程序用户信息
  goodsAllCtype: WxApiRoot + '/Shop/allctype', // 3.	获取商品类型
  goodsDetail: WxApiRoot + '/Shop/detail', // 4.	商品详情
  relatedGoods: WxApiRoot + '/Shop/tjgoods', // 5.	商品关联热门推荐
  isfav: WxApiRoot + '/User/isfav', // 6.	检测是否已收藏商品	
  fav: WxApiRoot + '/User/fav', // 7.	收藏商品
  unfav: WxApiRoot + '/User/unfav', // 8.	删除收藏
  buysRecord: WxApiRoot + '/Shop/buys', // 9. 获取购买记录	
  searchOrder: WxApiRoot + '/Order/search', // 11.	我的订单（全部、待付款、待发货、待收货、交易完成）
  userFavorite: WxApiRoot + '/User/favorite', // 12.	我的收藏	
  myAddress: WxApiRoot + '/User/address', // 13.	我的地址
  saveAddress: WxApiRoot + '/User/saveAddress', // 14.	添加新地址
  setDefaultAddress: WxApiRoot + '/User/defulatAddress', // 设置默认地址
  delAddress: WxApiRoot + '/User/delAddress', // 删除地址
  delOrder: WxApiRoot + '/Order/del', // 16.	删除订单

  CourseHotcourse:WxApiRoot+'/Course/hotcourse', //2、	热门课程
  NewsBanners:WxApiRoot+'/News/banners', //3、	Banner图
  NewsSearch:WxApiRoot+'/News/search', //4、	搜索新闻
  NewsDetail:WxApiRoot+'/News/detail', //9、	新闻详情
  CourseCatesearch:WxApiRoot+'/Course/catesearch', //1、 搜索课程分类	
  CourseDetail:WxApiRoot+'/Course/detail', //10、	课程详情
  CourseAttcourse:WxApiRoot+'/Course/attcourse', //6、	关注课程
  myattcourseware:WxApiRoot+'/User/myattcourseware', //22、	我的收藏课件
  myattnews:WxApiRoot+'/User/myattnews', //23、	我的收藏新闻
  myattcourse:WxApiRoot+'/User/myattcourse', // 21、	我的收藏课程
  mycert:WxApiRoot+'/User/mycert', // 24、	我的证书
  CourseWareLearn:WxApiRoot+'/CourseWare/learn', // 12、	学习课件

};
