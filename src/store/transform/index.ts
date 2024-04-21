import { scaleMinimum, scaleStep } from "@/Constants/constants";
import { createSlice } from "@reduxjs/toolkit";

interface Itransform {
    pan: { x: number, y: number }
    scale: number
}

interface ISetScaleAction {
    payload: number | { deltaY: number }
}

interface ISetPanAction {
    payload: { x: number, y: number },
}

const initialState: Itransform = {
    pan: { x: 0, y: 0 },
    scale: 1
}

const transformSlice = createSlice({
    name: 'transform',
    initialState,
    reducers: {
        setScale(state, action: ISetScaleAction) {
            if (typeof action.payload === 'object' && 'deltaY' in action.payload) {
                const newScale = action.payload.deltaY < 0 ? state.scale * scaleStep : state.scale / scaleStep;
                state.scale = newScale;
                return;
            }
            state.scale = action.payload
        },
        setPan(state, { payload }: ISetPanAction) {
            const { x, y } = payload
            state.pan = { x, y }
        }
    }
})

export default transformSlice.reducer;
export const { setScale, setPan } = transformSlice.actions
