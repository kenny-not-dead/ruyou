import { createSlice } from "@reduxjs/toolkit";
import uuid from 'react-uuid';


const initialState: Color = {
 colors: []
};

const paletteSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    createColor: (state) => {
      state.colors.push({id: uuid(), color: '#561ecb'})
    },
    deleteColor: (state, action) => {
    state.colors = state.colors.filter( item => item.id !== action.payload)
    },
    changeColor: (state, action) => {
      state.colors[state.colors.length-1].color = action.payload
    },
    changeCurrentColor: (state, action) => {
      const colorId =  state.colors.find(item => item.id === action.payload.currentId);
      if (colorId) colorId.color = action.payload.color.hex
    },
}
  
});

export const {createColor, deleteColor, changeColor, changeCurrentColor} = paletteSlice.actions;
export default paletteSlice.reducer;

