import { combineReducers, configureStore } from '@reduxjs/toolkit';
import timerReducer from './timerSlice';
import paletteSlice from './paletteSlice';



const rootReducer = combineReducers({ timer: timerReducer, color: paletteSlice});

export const store = configureStore({
	reducer: rootReducer
	
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
