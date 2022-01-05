import { zyzgz, } from '@/static/images/index';

export const ROUTER_NAME_MAP = {
    industryNews: 'IndustryNews',
    onlineStudy: 'OnlineStudy',
    me: 'Me'
};

export const ORDER_OTYPE_MAP = new Map([
    ['全部订单', -99],
    ['待付款', 1],
    ['待发货', 2],
    ['待收货', 3],
    ['交易完成', 4],
])

export const ORDER_STATUS_MAP = new Map([
    ['待付款', 0],
    ['待发货', 1],
    ['待收货', 2],
    ['交易完成', 3],
])
export const IS_AUTH_MAP = new Map([
    [0, '未认证'],
    [1, '认证通过'],
    [3, '人工审核中'],
    [4, '认证失败'],
])
export const TOTAL_CLASS = [
    {
        name: '职场岗前培训',
        src: zyzgz
    },
    {
        name: '工作职责培训',
        src: zyzgz
    },
    {
        name: '服务礼仪培训',
        src: zyzgz
    },
    {
        name: '投诉处理培训',
        src: zyzgz
    },
    {
        name: '阳关心态培训',
        src: zyzgz
    },
    {
        name: '压力缓解培训',
        src: zyzgz
    },
    {
        name: '素质拓展培训',
        src: zyzgz
    },
    {
        name: '时间管理培训',
        src: zyzgz
    },
    {
        name: '舆情管控培训',
        src: zyzgz
    },
    {
        name: '运营管理培训',
        src: zyzgz
    },
    {
        name: '团队协作培训',
        src: zyzgz
    },
    {
        name: '时事政策培训',
        src: zyzgz
    },
    {
        name: '融媒体培训',
        src: zyzgz
    },
];

export const SCORE_TYPE = {
    1:'学习',
    5:'消耗',
    6:'登录',
    7:'分享个人/群',
    8:'分享朋友圈',
    9:'其他分享',
    10:'反馈（奖励分数）'
}

// utype:用户类型，2领队、3裁判、4讲师、5ACM
export const UTYPE_MAP = {
    2:'领队', 3: '裁判',4:'讲师',5:'ACM'
}

// englevel:英语水平；一般、很好、非常好
export const ELEVEL_MAP = {
    '一般':'一般', '很好':'很好','非常好':'非常好'
}

// goodtype:擅长DI类型；A题、B题、C题、D题、E题、RS、PO、IC、DI课程、DI裁判、DI讲师、DI活动组织
export const GOODTYPE_MAP = {
    'A':'A技术类挑战','B':'B科技类挑战','C':'C艺术类挑战','D':'D即兴类挑战','E':'E工程类挑战','RS':'RS早教类挑战','PO':'PO服务学习类挑战'
}









// billtype: 发票种类，1电子发票，2纸质发票
export const BILLTYPE_MAP = {
    1:'电子发票',2:'纸质发票'
}


export const SEX_MAP = {
    '男':'男','女':'女'
}

export const formatMap = (params:{[key:string]: any}) => {
    if(params instanceof Object){
        return Object.keys(params).map(key => ({label:params[key], value:key}))
    }
    return [];
}

export const formatArr = (params: Array<number, string>) => {
    if( params instanceof Array){
        return params.reduce((res,  cur) => {
            res[cur] = cur;
            return res;
          },{})
    }
    return {};
}

export const YEAR_MAP = ['2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000']

export const TONGYISHU = 'https://gameapi.gete-di.com/ditrain/Uploads/DIHead/di.pdf';