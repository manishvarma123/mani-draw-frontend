const { createSlice } = require("@reduxjs/toolkit")


const initialState = {
    currentUser : null,
    walletBalance : 0,
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setCurrentUser : (state,action) => {
            state.currentUser = action.payload
        },
        setWalletBalance : (state,action) => {
            state.walletBalance = action.payload
        }
    }
})

export const {setCurrentUser,setWalletBalance} = authSlice.actions;

export default authSlice.reducer;