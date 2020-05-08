/*入口文件*/
import React from "react";
import ReactDOM from "react-dom"

//引入路由相关
import { HashRouter,BrowserRouter, Route, Switch } from "react-router-dom"

//redux相关
import {Provider} from "react-redux"
import store from './redux/store'



import Login from './page/login/login'
import Register from './page/register/register'
import BossInfo from "./page/bossInfo/bossInfo"
import BossMain from "./page/bossMain/boosMain"
import JobInfo from "./page/jobInfo/jobInfo"
import JobMain from "./page/jobMain/jobMain"
ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/bossInfo" component={BossInfo}></Route>
          <Route path="/bossMain" component={BossMain}></Route>
          <Route path="/jobInfo" component={JobInfo}></Route>
          <Route path="/jobMain" component={JobMain}></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
    
  )
  , document.getElementById("root"))
