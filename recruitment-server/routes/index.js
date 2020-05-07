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

module.exports = router;
