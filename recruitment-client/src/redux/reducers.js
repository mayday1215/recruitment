import {combineReducers} from "redux"
import {GETUSERINFO,ERR_MSG} from "./action-type"

const initUser = {
  username:'',
  _id:'',
  type:'',
  message:''
}
function user(state=initUser,action){
  console.log(action)
  switch(action.type){
    case GETUSERINFO:
      return {...action.data}
    case ERR_MSG:
      return {...state,message:action.data}
    default:
      return state
  }
}


export default combineReducers({
  user
})

