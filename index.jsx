import React from 'react'
import {render} from 'react-dom'
import {createStore , bindActionCreators} from 'redux'
import {connect , Provider} from 'react-redux'

//action
const CHANGE_TEXT = 'CHANGE_TEXT'
const BUTTON_CLICK = 'BUTTON_CLICK'
function changeText (){
  return {
    type : CHANGE_TEXT
  }
}
function buttonClick() {
  return {
    type : BUTTON_CLICK
  }
}

//reducter
const initialState = {
  text : 'Hello'
}
function myApp(state=initialState,action){
  switch (action.type) {
    case CHANGE_TEXT:
      return {
        text : state.text == 'Hello' ? 'World' : 'Hello'
      }
    case BUTTON_CLICK:
      return {
        text : 'You Clicked This Button !'
      }
  
    default : 
      return initialState
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
     <h1 onClick = {this.handleClick}>{this.props.text}</h1>
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
class App extends React.Component










