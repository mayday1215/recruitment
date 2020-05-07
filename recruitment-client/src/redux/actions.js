import {GETUSERINFO,ERR_MSG} from "./action-type"
import {request} from "../api/request"
import url from '../api/url'
const userInfo = (data) =>({type:GETUSERINFO,data})
const errMessage = (data) => ({type:ERR_MSG,data})

export const getUserInfo = (data) => {
  return dispatch => {
    request({url:url.login,method:'post',data}).then(data => {
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

