import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import classes from "./PalettePage.module.css";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { useDispatch } from "react-redux";
import {
  createColor,
  deleteColor,
  changeColor,
  changeCurrentColor,
} from "../store/paletteSlice";
import { useAppSelector } from "../hooks/redux-hooks";
import ColorItem from "../components/ColorItem";

export default function PalettePage() {
  const [color, setColor] = useColor("#561ecb");
  const [showPicker, setShowPicker] = useState(false);
  const [currentId, setcurrentId] = useState<string | null>(null);

  useEffect(() => {
    if (showPicker && !currentId) {
      setTimeout(() => {
        dispatch(changeColor(color.hex));
      }, 0);
    } else if (showPicker && currentId) {
      setTimeout(() => {
        dispatch(changeCurrentColor({ currentId, color }));
      }, 0);
    }
  }, [color]);

  const dispatch = useDispatch();
  const colors = useAppSelector((state) => state.color.colors);

  const createColorHandler = () => {
    setShowPicker(true);
    dispatch(createColor());
  };

  const changecurrentId = (id: string) => {
    if (!showPicker) setShowPicker(true);
    setcurrentId(id);
  };

  const pickerRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<any>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        pickerRef.current &&
        !colorRef.current.contains(e.target as HTMLElement) &&
        !pickerRef.current.contains(e.target as HTMLElement)
      ) {
        setShowPicker(false);
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  const deleteItem = (id: string) => {
    dispatch(deleteColor(id));
  };

  return (
    <div className={classes.wrapper}>
      <h2>PALETTE</h2>
      <div ref={colorRef} className={classes.palettewrapper}>
        {colors
          ? colors.map((i: any) => {
              return (
                <ColorItem
                  key={i.id}
                  id={i.id}
                  color={i.color}
                  deleteItem={deleteItem}
                  changecurrentId={changecurrentId}
                />
              );
            })
          : ""}
      </div>
      <div className={classes.picketbtnwrapper}>
        <button className={classes.timerButton} onClick={createColorHandler}>
          Добавить цвет
        </button>
      </div>

      {showPicker ? (
        <div className={classes.colorPicker} ref={pickerRef}>
          <ColorPicker color={color} onChange={setColor} />;
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
