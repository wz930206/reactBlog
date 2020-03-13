let ipUrl = 'http://127.0.0.1:7001/'

let servicePath = {
    getArticleList: ipUrl + 'default/getArticleList',        //首页列表接口
    getArticleById: ipUrl + 'default/getArticleById/',        //blog详情页接口
    getTypeInfo: ipUrl + 'default/getTypeInfo',        //头部类别
    getListById: ipUrl + 'default/getListById/',        //根据类别获取列表数据
    addClickCount: ipUrl + 'default/addClickCount/',        //文章点击次数
}

export default servicePath