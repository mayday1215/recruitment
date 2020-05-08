import React, { Component } from 'react'
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {getUserInfo} from "../../redux/actions"
import { NavBar, WingBlank, List, InputItem,Button,WhiteSpace, Toast  } from "antd-mobile"
import Logo from './../../commponents/logo/Logo'


const ListItme = List.Item



class Login extends Component {
  state = {
    username:'',
    password:'',
    errcode:''
  }
  
  //获取用户输入的信息
  getInfo = (name,val) => {
    this.setState({
      [name]:val
    })
  }
  //点击已有账户
  goRegister = () => {
    this.props.history.replace("/register")
  }
  //点击登录
  loginClick = () => {
    const {username,password} = this.state
    

    if(username.trim() === ""){
      this.setState({errcode:'账号不能为空'})
      return
    }else{
      this.setState({errcode:''})
    }
    if(password.trim()  === ""){
      this.setState({errcode:'密码不能为空'})
      return
    }else{
      this.setState({errcode:''})
    }

    this.props.getUserInfo({username,password})
  }

  render() {
    const {message,_id,type,header} = this.props.user
    const {errcode} = this.state
    if(_id){
      //登录成功
      if(type === "boss"){
        //老板
        if(header){
          //已经完善信息了
          return <Redirect to="/bossMain"/>
        }else{
          //还没完善信息
          return <Redirect to="/bossInfo"/>
        }
      }else{
        //求职者
        if(header){
          //已经完善信息了
          return <Redirect to="/jobMain"/>
        }else{
          //还没完善信息
          return <Redirect to="/jobInfo"/>
        }
      }
    }
    return (
      
      <div>
        <NavBar>栋&nbsp;哥&nbsp;直&nbsp;聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
          {message ? <div className='err'>{message}</div> : null}
          {errcode ? <div className='err'>{errcode}</div> : null}
            <InputItem placeholder="请输入用户名" onChange={(val)=> {this.getInfo('username',val)}}>用&nbsp;&nbsp;户&nbsp;&nbsp;名:</InputItem>
            <InputItem placeholder="请输入密码" type='password' onChange={(val)=> {this.getInfo('password',val)}}>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</InputItem>
            
            <Button type="primary" onClick={this.loginClick}>登录</Button>
            <WhiteSpace/>
            <Button onClick={this.goRegister}>注册</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
export default connect(
  state => ({user:state.user}),
  {getUserInfo}
)(Login)
