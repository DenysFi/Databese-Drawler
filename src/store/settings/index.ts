import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const settingsModeSelector = (state: { settings: ISettings }) => state.settings.mode;
export const settingsShowFieldSummarySelector = (state: { settings: ISettings }) => state.settings.showFieldSummary;

interface ISettings {
    mode: string,
    showGrid: boolean
    showFieldSummary: boolean,
    lastModified: string,
    autosave: boolean,
    showCardinality: boolean
}
type ISetSettingsValuesAction = Partial<ISettings>


const initialState: ISettings = {
    mode: 'light',
    showGrid: true,
    showFieldSummary: true,
    lastModified: '',
    autosave: true,
    showCardinality: true
}
export const settingsSlice = createSlice(
    {
        name: 'settings',
        initialState,
        reducers: {
            setSettingsValues(state, action: PayloadAction<ISetSettingsValuesAction>) {
                Object.assign(state, action.payload);
            },
            toggleValue(state, action: PayloadAction<keyof ISettings>) {
                const key = action.payload;

                if (typeof state[key] !== 'boolean') {
                    return;
                }

                Object.assign(state, { [key]: !state[key] })
            }
        }
    }
)
export const { setSettingsValues, toggleValue } = settingsSlice.actions;
export default settingsSlice.reducer