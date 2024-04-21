import { createSlice } from "@reduxjs/toolkit";


interface ISettings {
    mode: string,
    showGrid: boolean
    showFieldSummary: boolean,
    lastModified: string
}
interface ISetSettingsValuesAction {
    payload: Partial<ISettings>
}
const initialState: ISettings = {
    mode: 'light',
    showGrid: true,
    showFieldSummary: true,
    lastModified: ''

}
export const settingsSlice = createSlice(
    {
        name: 'settings',
        initialState,
        reducers: {
            setSettingsValues(state, action: ISetSettingsValuesAction) {
                state = { ...state, ...action.payload }
            }
        }
    }
)
export const { setSettingsValues } = settingsSlice.actions;
export default settingsSlice.reducer