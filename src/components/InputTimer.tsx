import React, { useState, ChangeEvent } from "react";
import classes from "./InputTimer.module.css";

interface InputTimerType {
  data: number;
  name: string;
  changeValues: (e: number, name: string) => void;
}

export default function InputTimer(props: InputTimerType) {
  const changeValues = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeValues(+e.currentTarget.value, props.name);
  };

  return (
    <div className={classes.wrapper}>
      <input
        className={classes.inputwrapper}
        type="number"
        value={props.data}
        onChange={(e) => changeValues(e)}
      />
      <p>{props.name === "min" ? ".min" : "s."}</p>
    </div>
  );
}
