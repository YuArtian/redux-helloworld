import React from 'react'
import {render} from 'react-dom'
import {createStore,bindActionCreators} from 'redux'
import {Provider,connect} from 'react-redux'

//action
function changeText (){
  return {
    type : 'CHANGE_TEXT'
  }
}
function buttonClick() {
  return {
    type : 'BUTTON_CLICK'
  }
}

//reducer
const initialState = {
  text : 'Hello'
}
function myApp(state=initialState,action){
  switch (action.type) {
    case 'CHANGE_TEXT':
      return {
        text : state.text == 'Hello' ? 'World' : 'Hello'
      }
    case 'BUTTON_CLICK':
      return {
        text : 'You Clicked This Button !'
      }
    default : 
      return {
        text : 'Hello'
      }
  }
}
//store
let store = createStore(myApp)
//组件
class Hello extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    this.props.actions.changeText()
  }
  render() {
    return (
     <h1 onClick = {this.handleClick}> {this.props.text} </h1>
    )
  }
}
class Change extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    this.props.actions.buttonClick();
  }
  render(){
    return (
      <button onClick={this.handleClick}>change</button>
    )
  }
}
class App extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    const {actions , text} = this.props
    return (
      <div>
        <Hello actions={actions} text={text} />
        <Change actions={actions}/>
      </div>
    )
  }
}
//连接react
//声明当state变化时关心的属性
function mapStateToProps(state){
  return {
    text : state.text
  }
}
//将store中的dispatch方法注入组件
function mapDispatchToProps(dispatch){
  return {
    actions : bindActionCreators(
      {
        changeText : changeText,
        buttonClick : buttonClick
      },
      dispatch
    )
  }
}
//给App两个props(text , actions)
App = connect(mapStateToProps,mapDispatchToProps)(App)
//渲染App
render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)






