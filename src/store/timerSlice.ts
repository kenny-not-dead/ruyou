import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  min: 1,
  sec: 0,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    changeValue: (state,action) => {
        switch (action.payload.name) {
        case 'min':
          if(action.payload.e>59) {
            state.min = 59
          } else state.min = action.payload.e;
        break;
        case 'sec':
          if(action.payload.e>59) {
            state.sec = 59
          } else state.sec = action.payload.e;
          break;
      }
    },
   secDecrement: (state) => {
      state.sec = state.sec - 1
    },
    minDecrement: (state) => {
      state.min = state.min - 1
      state.sec = 59
}
  }
});

export const {changeValue,secDecrement,  minDecrement} = timerSlice.actions;
export default timerSlice.reducer;

