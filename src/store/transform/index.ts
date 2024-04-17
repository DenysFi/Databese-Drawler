import { scaleMinimum } from "@/Constants/constants";
import { createSlice } from "@reduxjs/toolkit";

interface Itransform {
    pan: { x: number, y: number }
    scale: number
}

interface ISetScaleAction {
    payload: number
}

interface ISetPanAction {
    payload: { x: number, y: number },
}

const initialState: Itransform = {
    pan: { x: 0, y: 0 },
    scale: 1
}
const scaleStep = 1.05;
const transformSlice = createSlice({
    name: 'transform',
    initialState,
    reducers: {
        setScale(state, action: ISetScaleAction) {
            const scale = state.scale;
            const newScale = action.payload < 0 ? scale * scaleStep : scale / scaleStep;
            if (newScale < scaleMinimum) return;
            state.scale = newScale;
        },
        setPan(state, { payload }: ISetPanAction) {
            const { x, y } = payload
            state.pan = { x, y }
        }
    }
})

export default transformSlice.reducer;
export const { setScale, setPan } = transformSlice.actions
