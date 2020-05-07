const mongoose = require("mongoose")

const md5 = require("blueimp-md5")

mongoose.connect('mongodb://localhost:27017/dgzhipin_test')

const conn = mongoose.connection
conn.on("connected",() => {
  console.log('数据库连接成功...')
})
const Schema = mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  type:{
    type:String,
    required:true
  }
})

const UserModel = mongoose.model('user',Schema)

const userModel = new UserModel({username:'mayday',password:md5('123456'),type:'boos'})

userModel.save().then(res => {
  console.log(res,'添加成功')
}).catch(err => {
  console.log(err,'添加失败')
})

