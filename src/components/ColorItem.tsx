import React from "react";
import styled from "styled-components";
import classes from "./ColorItem.module.css";

interface ColorItemType {
  id: string;
  color: string;
  deleteItem: (id: string) => void;
  changecurrentId: (id: string) => void;
}

export default function ColorItem(props: ColorItemType) {
  const Span = styled.button`
    cursor: pointer;
    border: 1px solid #000;
    width: 50px;
    height: 50px;
    background: ${props.color};
  `;

  const deleteItem = () => {
    props.deleteItem(props.id);
  };

  const changecurrentId = () => {
    props.changecurrentId(props.id);
  };

  return (
    <Span type="button" className={classes.span} onClick={changecurrentId}>
      <span className={classes.deleteIcon} onClick={deleteItem}>
        X
      </span>
    </Span>
  );
}
