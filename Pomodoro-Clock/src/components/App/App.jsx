import React, { Component } from "react";
import "./App.css";
import Timer from "../Timer/Timer";
import Button from "../Button/Button";
import Settings from "../Settings/Settings";
import Footer from "../Footer/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    // this.timerID = 0;
  }

  get initialState() {
    return {
      breakTime: 5,
      sessionTime: 25,
      session: true,
      seconds: 1500,
      active: false
    };
  }

  _countDown = () => {
    if (this.state.seconds === 0) {
      clearInterval(this.timerID);
      this.setState(prevState => ({
        session: !prevState.session
      }));
      this._setTimer();

      let audio = new Audio();
      audio.src =
        "http://www.funmag.org/wp-content/uploads/2013/11/08-alarm-ringtones.mp3";
      audio.play();
    }
    const seconds = this.state.seconds - 1;
    this.setState({
      seconds,
      active: true
    });
  };

  _startPauseTimer = () => {
    this.setState(prevState => ({
      active: !prevState.active
    }));

    if (!this.state.active) {
      this.timer = setInterval(this._countDown, 1000);
    } else {
      clearInterval(this.timer);
    }
  };

  _setBreak = min => {
    this.setState({
      breakTime: min
    });
  };

  _setSession = min => {
    this.setState({
      sessionTime: min
    });
  };

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
  };

  render() {
    const { session, seconds, breakTime, sessionTime } = this.state;
    return (
      <div className="App container">
        <div className="Settings--wrap">
          <Settings
            time={this.state.breakTime}
            label="break-label"
            incrementId="break-increment"
            decrementId="break-decrement"
            increment={() => {
              if (breakTime < 60) {
                this.setState(prevState => ({
                  breakTime: prevState.breakTime + 1
                }));
              }
            }}
            decrement={() => {
              if (breakTime > 1) {
                this.setState(prevState => ({
                  breakTime: prevState.breakTime - 1
                }));
              }
            }}
            setTimer={this._setBreak}
            heading="Break time"
            id="Break--settings"
            timeID="break-length"
          />
          <Settings
            time={this.state.sessionTime}
            label="session-label"
            incrementId="session-increment"
            decrementId="session-decrement"
            increment={() => {
              if (sessionTime < 60) {
                this.setState(prevState => ({
                  sessionTime: prevState.sessionTime + 1
                }));
              }
            }}
            decrement={() => {
              if (sessionTime > 1) {
                this.setState(prevState => ({
                  sessionTime: prevState.sessionTime - 1
                }));
              }
            }}
            setTimer={this._setSession}
            heading="Session time"
            id="Session--settings"
            timeID="session-length"
          />
        </div>
        <Timer
          heading={session ? "Session" : "Break"}
          seconds={seconds}
          label="timer-label"
          min="time-left"
        />
        <div className="Action">
          <Button
            src={
              this.state.active
                ? "https://png.icons8.com/windows/35/ffffff/pause.png"
                : "https://png.icons8.com/windows/35/ffffff/play.png"
            }
            id="start_stop"
            alt={this.state.active ? "Pause button" : "Play button"}
            handleClick={e => {
              e.preventDefault();
              if (this.state.seconds === this.initialState.seconds) {
                this._setTimer();
              }
              this._startPauseTimer();
            }}
          />
          <Button
            src="https://png.icons8.com/windows/35/ffffff/synchronize.png"
            id="reset"
            type="reset"
            alt="Reset button"
            handleClick={() => {
              this.setState(this.initialState);
            }}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
