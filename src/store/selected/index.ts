import { objectType } from "@/Constants/enums";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ISelected {
    selected: {
        id: number | string,
        element: objectType
    }
}
type ISetSelected = Partial<ISelected> & { id: number | string, element: objectType }

const initialState: ISelected = {
    selected: {
        id: -1,
        element: objectType.None,
    }
}

const selectedSlice = createSlice({
    name: 'selected',
    initialState,
    reducers: {
        setSelected(state, action: PayloadAction<ISetSelected>) {
            state.selected = { ...state.selected, ...action.payload }
        },
        nullSelected(state) {
            state.selected = { ...initialState.selected }
        }
    }
})

export default selectedSlice.reducer;
export const { setSelected, nullSelected } = selectedSlice.actions;