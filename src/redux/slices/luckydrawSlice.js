const { createSlice } = require("@reduxjs/toolkit")



const initialState = {
    showDraws : [],
    drawStatus : 'live',
}

const luckydrawSlice = createSlice({
    name: 'luckydraw',
    initialState,
    reducers : {
        setShowDraws : (state,action) => {
            state.showDraws = action.payload
        },
        setDrawJoined : (state,action) => {
            const drawId = action.payload;
            const draw = state.showDraws.find(draw => draw._id === drawId);
            if(draw){
                draw.joined = true;
            }
        },
        setDrawStatus : (state,action) => {
            state.drawStatus = action.payload;
        }
    }
});

export const {setShowDraws,setDrawJoined,setDrawStatus} = luckydrawSlice.actions;

export default luckydrawSlice.reducer;