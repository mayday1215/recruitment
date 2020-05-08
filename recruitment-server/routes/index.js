var express = require('express');
var router = express.Router();
const {UserModel} = require('../db/models')
const md5 = require("blueimp-md5")
const filter = {password:0,_v:0}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//注册
router.post("/register",(req,res) => {
  console.log(req.body)
  const {username,password,type} = req.body
  UserModel.findOne({username}).then(data => {
    if(!data){
      new UserModel({username,type,password:md5(password)}).save().then(data => {
        res.send({code:0,data:{username:data.username,_id:data._id,type:data.type}})
      }).catch(err => {})
      //不存在
    }else{
      //存在该用户
      res.send({code:1,data:{message:'用户名已存在'}})
    }
  }).catch(err => {
    console.log(err)
  })
})

//登录
router.post("/login",(req,res) => {
  const {username,password} = req.body
  UserModel.findOne({username,password:md5(password)},filter).then(data => {
    if(data){
      //有用户
      res.send({code:0,data})
    }else{
      res.send({code:1,data:{message:'用户名或密码有误'}})
    }
  }).catch(err => {
    console.log(err)
  })
})

//修改用户信息
router.post("/updateUserInfo",(req,res) => {
  const user = req.body
  const _id = user._id
  UserModel.findByIdAndUpdate({_id},user).then(data => {
    console.log('data')
    const {username,type} = data
    const newUser = Object.assign(user,{username,type})
    if(data){
      //修改成功
      res.send({code:0,data:newUser})
    }else{
      //修改失败
      res.send({code:1,data:{message:'修改失败'}})
    }
  })

  // UserModel.findByIdAndUpdate({_id},req.body).then(data => {
  //   // const newUser = Object.assign(req.data,data)
  //   // if(data){
  //   //   console.log('修改成功',newUser)
  //   //   res.send({code:0,data:newUser})
  //   // }else{
  //   //  res.send({code:1,data:{message:'修改失败'}})
  //   // }
  // })
})

module.exports = router;
