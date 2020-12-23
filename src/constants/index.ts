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
    [3, '认证中'],
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