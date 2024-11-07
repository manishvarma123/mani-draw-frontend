import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    showSideBar : false
}

const sideBarSlice = createSlice({
    name : 'sidebar',
    initialState,
    reducers : {
        setShowSideBar : (state,action) => {
            state.showSideBar = action.payload
        }
    }
});

export const {setShowSideBar} = sideBarSlice.actions;

export default sideBarSlice.reducer;