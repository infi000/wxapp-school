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
  Exampaper:WxApiRoot+'/Exam/exampaper', // 14、	获取考试试卷
  Exampaperdetail:WxApiRoot+'/Exam/exampaperdetail', // 31、	获取试卷试题
  canswer:WxApiRoot+'/Exam/canswer', // 17、	提交题目答案
  examstart:WxApiRoot+'/Exam/examstart', // 15、	考试/测验开始
  examend:WxApiRoot+'/Exam/examend', // 16、	考试/测验结束
  daypaper:WxApiRoot+'/Exam/daypaper', // 26、	获取每日小测
  mydaypaperresult:WxApiRoot+'/User/mydaypaperresult', // 27、	获取小测结果
  learnhistory:WxApiRoot+'/User/learnhistory', // 28、	获取学习历史
  scorepos:WxApiRoot+'/User/scorepos', // 18、	个人考试结果（名次排行）
  userModify:WxApiRoot+'/User/modify', // 33、	更新用户信息
  myexamresult: WxApiRoot + '/Exam/myexamresult', // 32、	获取用户自己的考试/测验结果/测试历史
};
