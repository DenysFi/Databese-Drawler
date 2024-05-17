import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    header: true,
    sidebar: true,
    fullscreen: false
}
const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        toggleHeader: (state) => {
            state.header = !state.header
        },
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar
        },
        toggleFullscreen: (state) => {
            state.fullscreen = !state.fullscreen
        }
    }
})

export default layoutSlice.reducer;
export const { toggleHeader, toggleSidebar, toggleFullscreen } = layoutSlice.actions