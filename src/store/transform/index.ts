import { scaleMinimum } from "@/Constants/constants";
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    transform: {
        pan: { x: 0, y: 0 },
        scale: 1
    }
}

const transformSlice = createSlice({
    name: 'transform',
    initialState,
    reducers: {
        setTransform(state, action) {
            state.transform = { ...state.transform, ...action.payload };
        },
        setScale(state, action) {
            const scale = state.transform.scale;
            const newScale = action.payload < 0 ? scale + 0.07 : scale - 0.07;
            if (newScale < scaleMinimum) return;
            state.transform.scale = action.payload < 0 ? scale + 0.07 : scale - 0.07;
        }
    }
})

export default transformSlice.reducer;
export const { setTransform, setScale } = transformSlice.actions
