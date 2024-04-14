import { combineReducers, configureStore } from "@reduxjs/toolkit";
import settingsSlice from "./settingsSlice";
const rootReducer = combineReducers({
    settings: settingsSlice
})
export const store = configureStore(
    {
        reducer: rootReducer
    }
)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;