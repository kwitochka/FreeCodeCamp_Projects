const secondsToMinutes = (secs) => {
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    
  if (secs >= 3600) {
    minutes = 60;
  }
    minutes < 10 ? minutes = '0' + minutes : minutes;
    seconds < 10 ? seconds = '0' + seconds : seconds;
 

    let obj = {
      "m": minutes,
      "s": seconds
    };
    
    return obj;
  }

  export default secondsToMinutes;