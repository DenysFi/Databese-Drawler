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

    }
})

export default transformSlice.reducer;
