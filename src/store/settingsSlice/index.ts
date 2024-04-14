import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'light',
    showGrid: true
}
export const settingsSlice = createSlice(
    {
        name: 'settings',
        initialState,
        reducers: {
            setSettingsValues(state, payload) {

            }
        }
    }
)
export const { setSettingsValues } = settingsSlice.actions;
export default settingsSlice.reducer