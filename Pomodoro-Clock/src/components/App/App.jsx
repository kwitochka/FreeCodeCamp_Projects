import React, { Component } from 'react';
import './App.css';
import Timer from "../Timer/Timer";
import Button from "../Button/Button";
import Settings from '../Settings/Settings'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    // this.timerID = 0;
  }

  get initialState () {
    return {
      breakTime: 5,
      sessionTime: 25,
      session: true,
      seconds: 1500,
      active: false
    };
  }

  _increment = (time) => {
    if (time === this.state.breakTime && time < 60) {
      this.setState(prevState => ({
        breakTime: prevState.breakTime + 1
      }))
    } else if (time === this.state.sessionTime && time < 60) {
      this.setState(prevState => ({
        sessionTime: prevState.sessionTime + 1
      }))
    }
  };

  _decrement = (time) => {
    if (time === this.state.breakTime && time > 0){
      this.setState(prevState=>({
        breakTime: prevState.breakTime-1
      }))
    } else if (time === this.state.sessionTime && time > 0){
      this.setState(prevState => ({
        sessionTime: prevState.sessionTime - 1
      }))
    }
  };
  
  _countDown = () => {
   if (this.state.seconds === 0) {
      clearInterval(this.timerID);
      this.setState(prevState => ({
        session: !prevState.session,
      }))
      this._setTimer();
        
      let audio = new Audio();
      audio.src = 'http://www.funmag.org/wp-content/uploads/2013/11/08-alarm-ringtones.mp3';
      audio.play();
      }
    const seconds = this.state.seconds - 1;
    this.setState({
      seconds,
      active: true
    })
  }

  _startPauseTimer = () => {
    this.setState(prevState => ({
      active: !prevState.active
    }));

    if (!this.state.active) {
      this.timer = setInterval(this._countDown, 1000);
    } else {
      clearInterval(this.timer);
    }
  }

  _setBreak = (min) => {
    this.setState({ 
      breakTime: min,
    }) 
  }

  _setSession = (min) => {
      this.setState({
      sessionTime: min,
    });
  }

  _setTimer = () => {
    this.state.session 
    ? this.setState({
        seconds: this.state.sessionTime * 60,
        session: true
    })
    : this.setState({
      seconds: this.state.breakTime * 60,
      session: false
    });
  }

  // _resetAll = () => {
  //   clearInterval(this.timer);
  //   this.setState(this.initialState);
    // this.audio.pause();
    // this.audio.currentTime = 0;
  // }

  render(){
    const {session, seconds, breakTime, sessionTime} = this.state;
    return (
      <div className="App container">
        <div className='Settings--wrap'>
        <Settings time = {this.state.breakTime} 
          increment={()=> this._increment(breakTime)}
          decrement={() => this._decrement(breakTime)}
          setTimer = {this._setBreak} 
          heading = 'Break time' 
          id='Break--settings' 
          timeID = 'Break--time' 
         
        />
        <Settings 
          time = {this.state.sessionTime} 
            increment={()=> this._increment(sessionTime)}
            decrement={() => this._decrement(sessionTime)}
          setTimer={this._setSession} 
          heading = 'Session time' 
          id='Session--settings' 
          timeID='Session--time' 
          
        />
        </div>
        <Timer
          heading={session ? 'Session' : 'Break'}
          seconds={seconds}
          id="time-left"
        />
        <div className='Action'>
          <Button src={this.state.active ? "https://png.icons8.com/windows/35/ffffff/pause.png" : "https://png.icons8.com/windows/35/ffffff/play.png"} 
            id="start_stop" 
            alt={this.state.active ? 'Pause button' : 'Play button'} 
            handleClick={(e) => {
              e.preventDefault();
              if(this.state.seconds === this.initialState.seconds){
                this._setTimer();
              }
              this._startPauseTimer();
            } }
          />
          <Button
            src="https://png.icons8.com/windows/35/ffffff/synchronize.png"
            id="reset"
            type = "reset"
            alt = 'Reset button' 
            handleClick={() => {
              this.setState(this.initialState);
            } 
          }
          />
        </div>
      </div>
    );
  }
}


export default App;
