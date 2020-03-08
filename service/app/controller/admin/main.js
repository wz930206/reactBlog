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
    // 登陆接口
    async index() {
      let sql = ''
    }
    async checkLogin() {
      let userName = this.ctx.request.body.userName
      let password = this.ctx.request.body.password
      const sql = " SELECT userName FROM admin_user WHERE userName =  '"+ userName + "' AND password = '"+password+"'"
      let res = await this.app.mysql.query(sql)
      if(res.length > 0) {
        let openId = new Date().getTime()
        this.ctx.session.openId = {"openId": openId}
        this.ctx.body = {
          "code": 10000,
          "message":"登录成功",
          "openId": openId
        }
      } else {
        this.ctx.body = {
          "code": 10001,
          "message": "登录失败"
        }
      }
    }
}
module.exports = MainController

