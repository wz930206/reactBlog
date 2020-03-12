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

class MainController extends Controller {
    
  async index() {
    let sql = 'this is api'
    this.ctx.body = sql
  }
  // 登陆接口
  async checkLogin() {
    let userName = this.ctx.request.body.userName
    let password = this.ctx.request.body.password
    let sql = " SELECT userName FROM admin_user WHERE userName =  '" + userName + "' AND password = '" + password + "'"
    let res = await this.app.mysql.query(sql)
    if(res.length > 0) {
      let openId = new Date().getTime()
      this.ctx.session.openId = {"openId": openId}
      this.ctx.body = {
        "code": 10000,
        "message":"登录成功",
        "data": {
          "openId": openId
        }
      }
    } else {
      this.ctx.body = {
        "code": 10001,
        "message": "登录失败"
      }
    }
  }
  async register() {
    let userName = this.ctx.request.body.userName
    let password = this.ctx.request.body.password
    let sql = 'SELECT admin_user.userName FROM admin_user WHERE admin_user.userName=' + userName
    const result = await this.app.mysql.query(sql)
    console.log(result)
    this.ctx.body = {
      "code": 10000,
      "message": "获取成功",
      "data": result
    }
    // const inserSuccess = result.affectedRows === 1
    // console.log(inserSuccess)
    // if(inserSuccess) {
    //   this.ctx.body = {
    //     code: 10000,
    //     message: '注册成功'
    //   }
    // }
    
  }
  // 获取文章类型
  async getTypeInfo() {
    const typeResult = await this.app.mysql.select('type')
    this.ctx.body = {
      "code": 10000,
      "message": "获取成功",
      "data": typeResult
    }
  }
  // 发布文章 
  async addArticle() {
    let tempAriticle = this.ctx.request.body
    const result = await this.app.mysql.insert('article',tempAriticle)
    const insertSuccess = result.affectedRows === 1   //是否插入成功
    const insertId = result.insertId                //插入成功返回的id
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId: insertId
    }
  }
  // 修改文章
  async updateArticle() {
    let tempAriticle = this.ctx.request.body
    const result = await this.app.mysql.update('article',tempAriticle)
    const updateSuccess = result.affectedRows === 1
    this.ctx.body = {
      isSuccess: updateSuccess
    }
  }
  // 查询文章列表
  async getArticleList () {
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'ORDER BY article.id DESC '
    const resultlIST = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: resultlIST
    }
  }
  //文章列表 删除数据
  async delArticle() {
    let id = this.ctx.params.id
    const res = await this.app.mysql.delete('article',{'id':id})
    this.ctx.body = {
      code: 10000,
      data: res.data
    }
  }
  async getArticleById() {
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    'article.article_cointent as articleContent,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
    'article.view_count as viewCount ,'+
    'type.typeName as typeName ,'+
    'type.id as typeId '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'WHERE article.id='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result
    }
  }
}
module.exports = MainController

