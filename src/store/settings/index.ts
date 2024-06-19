import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const settingsModeSelector = (state: { settings: ISettings }) => state.settings.mode;

interface ISettings {
    mode: string,
    showGrid: boolean
    showFieldSummary: boolean,
    lastModified: string,
    autosave: boolean
}
type ISetSettingsValuesAction = Partial<ISettings>


const initialState: ISettings = {
    mode: 'light',
    showGrid: true,
    showFieldSummary: true,
    lastModified: '',
    autosave: true

}
export const settingsSlice = createSlice(
    {
        name: 'settings',
        initialState,
        reducers: {
            setSettingsValues(state, action: PayloadAction<ISetSettingsValuesAction>) {
                Object.assign(state, action.payload);
            }
        }
    }
)
export const { setSettingsValues } = settingsSlice.actions;
export default settingsSlice.reducer