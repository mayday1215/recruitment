import React, { Component } from 'react'
import logo from './zp.jpg'
import "./logo.css"
export default class Logo extends Component {
  render() {
    return (
      <div className='logo'>
        <img src={logo} className="logo-img"/>
      </div>
    )
  }
}
