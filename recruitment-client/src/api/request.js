import axios from "axios"
import {Toast} from "antd-mobile"

export function request(config){
  return new Promise((resolve,reject) => {
    const instance = axios.create({
      timeout:5000
    })
    instance.interceptors.request.use(config => {
      Toast.loading("加载中...",0)
      return config
    })
    instance.interceptors.response.use(data => {
      Toast.hide()
      return data.data
    })
    instance(config).then(data => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
