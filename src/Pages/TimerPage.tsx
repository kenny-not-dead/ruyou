import { useState } from "react";
import InputTimer from "../components/InputTimer";
import { useAppSelector } from "../hooks/redux-hooks";
import { useDispatch } from "react-redux";
import { changeValue, secDecrement, minDecrement } from "../store/timerSlice";
import classes from "./TimerPage.module.css";

export default function TimerPage() {
  const [timerOn, setTimerOn] = useState(false);
  const [finish, setFinish] = useState(false);

  const min = useAppSelector((state) => state.timer.min);
  const sec = useAppSelector((state) => state.timer.sec);

  const dispatch = useDispatch();

  const changeValues = (e: number, name: string) => {
    dispatch(changeValue({ e, name }));
  };

  const TimerOnHandler = () => {
    setTimerOn(true);
    let currentSec = sec;
    let currentMin = min;
    const interval = setInterval(() => {
      if (currentSec > 0) {
        dispatch(secDecrement());
        currentSec = currentSec - 1;
      } else {
        if (currentMin > 0) {
          dispatch(minDecrement());
          currentMin = currentMin - 1;
          currentSec = 60;
        } else {
          setFinish(true);
          clearInterval(interval);
        }
      }
    }, 1000);
  };

  const newTimer = () => {
    setTimerOn(false);
    setFinish(false);
    dispatch(changeValue({ e: 1, name: "min" }));
  };

  return (
    <div className={classes.wrapper}>
      <h2>TIMER</h2>
      {!timerOn ? (
        <div className={classes.content}>
          <InputTimer changeValues={changeValues} data={min} name={"min"} />
          <InputTimer changeValues={changeValues} data={sec} name={"sec"} />
        </div>
      ) : !finish ? (
        <p className={classes.counter}>
          {min}:{sec < 10 ? "0" + sec : sec}
        </p>
      ) : (
        <div>
          <p className={classes.finishP}>Готово!</p>
          <button className={classes.timerButton} onClick={newTimer}>
            NEW TIMER
          </button>
        </div>
      )}

      {!timerOn ? (
        <button className={classes.timerButton} onClick={TimerOnHandler}>
          START
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
