const { createSlice } = require("@reduxjs/toolkit")


const initialState = {
    showPage : 'lucky-draw',
    user : "",
    showPopUp : "",
}

const routeSlice = createSlice({
    name : 'route',
    initialState,
    reducers : {
        setShowPage : (state,action) => {
            state.showPage = action.payload
        },
        setUser : (state,action) => {
            state.user = action.payload
        },
        setShowPopUp : (state,action) => {
            state.showPopUp = action.payload
        }
    }
})

export const {setShowPage,setUser,setShowPopUp} = routeSlice.actions;

export default routeSlice.reducer;