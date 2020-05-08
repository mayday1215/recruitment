import {GETUSERINFO,ERR_MSG} from "./action-type"
import {request} from "../api/request"
import url from '../api/url'
//登录
const userInfo = (data) =>({type:GETUSERINFO,data})
const errMessage = (data) => ({type:ERR_MSG,data})

//登录
export const getUserInfo = (data) => {
  return dispatch => {
    request({url:url.login,method:'post',data}).then(data => {
      console.log(data)
      if(data.code === 0){
        dispatch(userInfo(data.data))
      }else if(data.code === 1){
        dispatch(errMessage(data.data.message))
      }
    }).catch(err => {
      console.log(err)
    })
  } 
}

//修改用户信息
export const updateUserInof = (data) => {
  
  return dispatch => {
    request({
      url:url.updateUserInfo,
      method:'post',
      data
    }).then(res => {
      console.log(res)
      if(res.code === 0){
        //修改成功
        dispatch(userInfo(res.data))//返回的数据
      }else if(res.code === 1){
        //修改失败
        dispatch(errMessage(data.data.message))
      }
    }).catch(err => {
      
    })
  }
}

