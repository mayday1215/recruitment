import React, { Component } from 'react'
import {NavBar,InputItem,Button,TextareaItem} from "antd-mobile"
import SelectHeader from './../../commponents/selectHeader/selectHeader'
import {connect} from "react-redux"
import {updateUserInof} from "./../../redux/actions"
import {Redirect} from "react-router-dom"
class JobInfo extends Component {
  state = {
    header: '', //头像
    post: '', //职位
    info: '', //个人职位接受
    errmsg:''
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
    
    const {post,info} = this.state
    if(!info){
      this.setState({errmsg:'个人介绍必须填'})
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
    // this.props.updateUserInof()
  }

  render() {
    const {post,info} = this.props.user
    if(post || info){
      return <Redirect to="/jobMain"></Redirect> 
    }
    return (
      <div>
        <NavBar>求职者信息完善</NavBar>
        <SelectHeader getHeader={this.getHeader}/>
        {
          this.state.errmsg ? <div className="err">{this.state.errmsg}</div> :null
        }
        <InputItem placeholder="请输入求职岗位" onChange={val => {this.getInfo('post',val)}}>求职岗位:</InputItem>
        <TextareaItem title="个人介绍"  rows={3} placeholder="请输入个人介绍" onChange={val => {this.getInfo('info',val)}}></TextareaItem>
        <Button type="primary" onClick={this.saveClick}>保存</Button>
      </div>
    )
  }
}
export default connect(
  state => ({user:state.user}),
  {updateUserInof}
)(JobInfo)