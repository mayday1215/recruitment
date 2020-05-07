const mongoose = require("mongoose")

const md5 = require("blueimp-md5")

mongoose.connect('mongodb://localhost:27017/dgzhipin')

const conn = mongoose.connection
conn.on("connected",() => {
  console.log('数据库连接成功...')
})
const Schema = mongoose.Schema({
  username: {type: String, required: true}, // 用户名
  password: {type: String, required: true}, // 密码
  type: {type: String, required: true}, // 用户类型: dashen/laoban
  header: {type: String}, // 头像名称
  post: {type: String}, // 职位
  info: {type: String}, // 个人或职位简介
  company: {type: String}, // 公司名称
  salary: {type: String} // 月薪
})

const UserModel = mongoose.model('user',Schema)

module.exports = {
  UserModel
}



