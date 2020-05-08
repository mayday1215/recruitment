import React, { Component } from 'react'
import {NavBar,InputItem,Button,TextareaItem} from "antd-mobile"
import {connect} from "react-redux"
import SelectHeader from './../../commponents/selectHeader/selectHeader'
import {updateUserInof} from '../../redux/actions'
import {Redirect} from "react-router-dom"

class BossInfo extends Component {
  state = {
    header: '', //头像
    post: '', //职位
    info: '', //个人职位接受
    company: '', //公司名称
    salary: '', //工资
    errmsg:'' //错误提示
  }

  getInfo = (name,val) => {
    this.setState({
      [name]:val
    })
  }

  getHeader = (header) => {
    this.setState({
      header
    })
  }
  //点击保存
  saveClick = () => {
    const {header,post,info,company,salary,errmsg} = this.state
    if(!post){
      this.setState({errmsg:'必须填写职位'})
      return
    }else{
      this.setState({errmsg:''})
    }
    if(!company){
      this.setState({errmsg:'必须填写公司名'})
      return
    }else{
      this.setState({errmsg:''})
    }
    const {_id} = this.props.user
    if(!_id){
      this.props.history.replace("/login")
      return
    }
    this.props.updateUserInof({_id,...this.state})
  }

  render() {
    const {post,company} = this.props.user
    if(post || company){
      return <Redirect to="/bossMain"></Redirect> 
    }
    return (
      <div>
        <NavBar>老板信息完善</NavBar>
        <SelectHeader getHeader={this.getHeader}/>
        {
          this.state.errmsg ? 
          <div className="err">{this.state.errmsg}</div>:
          null
        }
        <InputItem placeholder="请输入招聘职位" onChange={val => {this.getInfo('post',val)}}>招聘职位:</InputItem>
        <InputItem placeholder="请输入招聘职位" onChange={val => {this.getInfo('company',val)}}>公司名称:</InputItem>
        <InputItem placeholder="请输入招聘职位" onChange={val => {this.getInfo('salary',val)}}>职位薪资:</InputItem>
        <TextareaItem title="职位要求"  rows={3} placeholder="请输入招聘职位" onChange={val => {this.getInfo('info',val)}}></TextareaItem>
        <Button type="primary" onClick={this.saveClick}>保存</Button>
      </div>
    )
  }
}
export default connect(
  state => ({user:state.user}),
  {updateUserInof}
)(BossInfo)
