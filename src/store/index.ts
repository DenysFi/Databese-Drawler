import { combineReducers, configureStore } from "@reduxjs/toolkit";
import settingsSlice from "./settings";
import tablesSlice from "./tables";
import selected from "./selected";
import transform from "./transform";
import layout from "./layout";

const rootReducer = combineReducers({
    settings: settingsSlice,
    tables: tablesSlice,
    selected: selected,
    transform: transform,
    layout: layout
})
export const store = configureStore(
    {
        reducer: rootReducer
    }
)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;