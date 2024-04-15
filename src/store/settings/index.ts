import { createSlice } from "@reduxjs/toolkit";

interface ISettings {
    mode: string,
    showGrid: boolean
    showFieldSummary: boolean
}
const initialState = {
    mode: 'light',
    showGrid: true,
    showFieldSummary: true
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