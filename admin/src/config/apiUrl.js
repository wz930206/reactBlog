let ipUrl = 'http://127.0.0.1:7001/admin/'

let servicePath = {
    checkLogin: ipUrl + 'checkLogin',   //登陆
    getTypeInfo: ipUrl + 'getTypeInfo',   //获取文章类型
    addArticle: ipUrl + 'addArticle',   //添加文章
    updateArticle: ipUrl + 'updateArticle',   //编辑文章
    getArticleList: ipUrl + 'getArticleList',   //文章列表
    delArticle: ipUrl + 'delArticle/',   //删除文章
    getArticleById: ipUrl + 'getArticleById/',   //编辑文章 获取文章内容
}

export default servicePath