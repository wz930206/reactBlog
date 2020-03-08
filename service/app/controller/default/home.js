/*
 * @Author: your name
 * @Date: 2020-03-04 16:00:18
 * @LastEditTime: 2020-03-06 15:14:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react\react-blog\service\app\controller\default\home.js
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let result = await this.app.mysql.select("blog_content",{})
        console.log(result)
        this.ctx.body=result
 
  }
    // 首页列表接口
    async getArticleList() {
      let sql = `SELECT article.id as id,
              article.title as title,
              article.introduce as introduce,
              FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,
              article.view_count as viewCount,
              .type_main.typeName as typeName
              FROM article LEFT JOIN type_main ON article.type_id = type_main.Id`
        const result =  await this.app.mysql.query(sql)
        this.ctx.body = {
          code: 200,
          message: '成功',
          data:result
        }
    }
    // 详情页接口
    async getArticleById() {
      let id = this.ctx.params.id
      let sql = `SELECT article.id as id,
              article.title as title,
              article.introduce as introduce,
              article.article_cointent as articleContent,
              FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,
              article.view_count as viewCount,
              .type_main.typeName as typeName,
              type_main.id as typeId
              FROM article LEFT JOIN type_main ON article.type_id = type_main.Id WHERE article.id=${id}`
        const result =  await this.app.mysql.query(sql)
        this.ctx.body = {
          code: 200,
          message: '成功',
          data:result
        }
    }
    // 首页文章类别接口
    async getTypeInfo() {
      let result = await this.app.mysql.select('type_main')
      this.ctx.body = {
          code: 200,
          message: '成功',
          data:result
        }
    }
    // 根据类别获取文章列表
    async getListById() {
      let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'WHERE type_id='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}
    }
}
module.exports = HomeController

