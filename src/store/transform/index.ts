import { scaleMinimum } from "@/Constants/constants";
import { createSlice } from "@reduxjs/toolkit"
interface Itransform {
    transform: {
        pan: { x: number, y: number }
        scale: number
    }
}
interface ISetScaleAction {
    payload: number
}
interface ISetTransformAction {
    payload: Partial<Itransform>,
}
const initialState: Itransform = {
    transform: {
        pan: { x: 0, y: 0 },
        scale: 1
    }
}

const transformSlice = createSlice({
    name: 'transform',
    initialState,
    reducers: {
        setTransform(state, { payload }: Partial<ISetTransformAction>) {
            state.transform = { ...state.transform, ...payload };
        },
        setScale(state, action: ISetScaleAction) {
            const scale = state.transform.scale;
            const newScale = action.payload < 0 ? scale * 1.05 : scale / 1.05;
            if (newScale < scaleMinimum) return;
            state.transform.scale = newScale;
        }
    }
})

export default transformSlice.reducer;
export const { setTransform, setScale } = transformSlice.actions
