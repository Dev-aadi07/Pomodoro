import { useEffect, useMemo, useState } from 'react';
import '../../styles/Pomo.css';
import Background from './Background';

function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [secLeft, setSecLeft] = useState(1500);
  const [mode, setMode] = useState('pomo');
  const [resetSpin, setResetSpin] = useState(false);


  const durations = useMemo(
    () => ({ pomo: 25 * 60, short: 5 * 60, long: 15 * 60 }),
    []
  );

  const formatTime = (sec) => {
    const min = String(Math.floor(sec / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `${min}:${secs}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecLeft(durations[mode]);
    setResetSpin(true);
    setTimeout(() => setResetSpin(false), 500);
  };

  useEffect(() => {
    let timer;
    if (isRunning && secLeft > 0) {
      timer = setInterval(() => {
        setSecLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, secLeft]);

  useEffect(() => {
    setSecLeft(durations[mode]);
    setIsRunning(false);
  }, [mode, durations]);

  return (
    <>
      <Background />
      <div className="pomo-container">
        <div className="pomo-duration">
          <button
            className={`pomo break ${mode === 'pomo' ? 'active' : ''}`}
            onClick={() => setMode('pomo')}
          >
            pomodoro
          </button>
          <button
            className={`short break ${mode === 'short' ? 'active' : ''}`}
            onClick={() => setMode('short')}
          >
            short break
          </button>
          <button
            className={`long break ${mode === 'long' ? 'active' : ''}`}
            onClick={() => setMode('long')}
          >
            long break
          </button>
        </div>

        <div className="pomo-counter">{formatTime(secLeft)}</div>

        <div className="pomo-clock-action">
          <button
            onClick={() => setIsRunning((prev) => !prev)}
            className="break start"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>

          <img
            onClick={handleReset}
            width="30"
            height="30"
            className={`reset ${resetSpin ? 'spin' : ''}`}
            src="https://img.icons8.com/ios-filled/50/FFFFFF/recurring-appointment.png"
            alt="reset-icon"
          />
        </div>
      </div>
    </>
  );
}

export default Timer;