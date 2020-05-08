import React, { Component } from 'react'

import {request} from "../../api/request"
import url from "./../../api/url"

import "./register.css"

import Logo from './../../commponents/logo/Logo'
import { NavBar, WingBlank, List, InputItem, Radio,Button,WhiteSpace,Toast  } from "antd-mobile"
const ListItme = List.Item


export default class Register extends Component {
  state = {
    username:'',
    password:'',
    qrpassword:'',
    type:'boss',
    isErrMsg:''
  }
  
  //获取用户输入的信息
  getInfo = (name,val) => {
    this.setState({
      [name]:val
    })
  }
  //点击已有账户
  goLogin = () => {
    this.props.history.replace("/login")
  }
  //点击注册
  register = () => {
   
    
    const {username,password,type,qrpassword} = this.state
    if(username.trim() === ""){
      this.setState({isErrMsg:'用户名不能为空'})
      return 
    }else{
      this.setState({isErrMsg:''})
    }
    if(password.trim() === ""){
      this.setState({isErrMsg:'密码不能为空'})
      return 
    }else{
      this.setState({isErrMsg:''})
    }
    if(password !== qrpassword){
      this.setState({isErrMsg:'两次密码必须相同'})
      return 
    }else{
      this.setState({isErrMsg:''})
    }
    request({url:url.register,data:{username,password,type},method:'post'}).then(data => {
      console.log(data)
      if(data.code === 0){
        //成功
        Toast.info('注册成功请登录', 2);
        this.props.history.push("/login")
      }else if(data.code === 1){
        //用户名已存在
        this.setState({
          isErrMsg:data.data.message
        })
      }
    }).catch(err => {
      console.log(err)
    })

  }

  render() {
   
    const {isErrMsg} = this.state
    return (
      <div>
        <NavBar>栋&nbsp;哥&nbsp;直&nbsp;聘</NavBar>
        <Logo />
        <WingBlank>
          
          <List>
    {isErrMsg ? <div className='err'>{isErrMsg}</div> : null}
            <InputItem placeholder="请输入用户名" onChange={(val)=> {this.getInfo('username',val)}}>用&nbsp;&nbsp;户&nbsp;&nbsp;名:</InputItem>
            <InputItem placeholder="请输入密码" type='password' onChange={(val)=> {this.getInfo('password',val)}}>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</InputItem>
            <InputItem placeholder="请输入确认密码" type="password" onChange={(val)=> {this.getInfo('qrpassword',val)}}>确认密码:</InputItem>
            <ListItme>
                用户类型：
              <Radio checked={this.state.type === 'boss'}  onChange={(val)=> {this.getInfo('type','boss')}}>老板</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={this.state.type === 'job'}  onChange={(val)=> {this.getInfo('type','job')}}>求职者</Radio>
            </ListItme>
            <Button type="primary" onClick={this.register}>注册</Button>
            <WhiteSpace/>
            <Button onClick={this.goLogin}>已有账户</Button>
          </List>


        </WingBlank>
      </div>
    )
  }
}
