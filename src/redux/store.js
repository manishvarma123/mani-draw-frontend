import { configureStore } from "@reduxjs/toolkit";
import routeReducer from './slices/route';
import sideBarReducer from './slices/sidebarSlice'
import authReducer from './slices/authSlice'
import luckydrawReducer from './slices/luckydrawSlice'


export const store = configureStore({
    reducer: {
        auth : authReducer,
        route : routeReducer,
        sidebar : sideBarReducer,
        draw : luckydrawReducer,
    }
})