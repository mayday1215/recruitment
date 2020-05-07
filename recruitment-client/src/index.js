/*入口文件*/
import React from "react";
import ReactDOM from "react-dom"

//引入路由相关
import { HashRouter,BrowserRouter, Route, Switch } from "react-router-dom"

//redux相关
import {Provider} from "react-redux"
import store from './redux/store'



import Main from "./page/main/main"
import Login from './page/login/login'
import Register from './page/register/register'
ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route component={Main}></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
    
  )
  , document.getElementById("root"))
