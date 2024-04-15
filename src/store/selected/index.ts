import { objectType } from "@/Constants/enums";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selected: {
        id: -1,
        element: objectType.None,
    }
}
const selectedSlice = createSlice({
    name: 'selected',
    initialState,
    reducers: {
        setSelected(state, action) {
            state.selected = { ...state.selected, ...action.payload }
        },
        resetSelected(state) {
            state.selected = { ...initialState.selected }
        }
    }
})

export default selectedSlice.reducer;
export const { setSelected, resetSelected } = selectedSlice.actions;