import { combineReducers, configureStore } from "@reduxjs/toolkit";
import settingsSlice from "./settingsSlice";
import tablesSlice from "./tablesSlice";

const rootReducer = combineReducers({
    settings: settingsSlice,
    tables: tablesSlice
})
export const store = configureStore(
    {
        reducer: rootReducer
    }
)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;