import React, { Component } from 'react'
import {Grid} from "antd-mobile"
import "./selectHeader.css"
export default class SelectHeader extends Component {
  constructor(props){
    super(props)
    this.headerList = []
    for(let i = 0; i < 20; i++){
      this.headerList.push({
        text:'头像'+(i+1),
        icon:require(`./images/头像${i+1}.png`)
      })
    }
  }
  state = {
    icon:null
  }

  headerClick = (el) => {
    this.setState({
      icon:el.icon
    })
    this.props.getHeader(el.icon)
  }
  render() {
    return (
      <div>
        {
          !this.state.icon ? 
          <div className="sub-title">请选择头像</div> :
        <div className="sub-title">已选择头像:
          <img src={this.state.icon}/>
        </div>
         }
        <Grid data={this.headerList} columnNum="5" onClick={this.headerClick}/>
      </div>
    )
  }
}
