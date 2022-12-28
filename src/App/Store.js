import { configureStore } from "@reduxjs/toolkit";
import { navSliceReducer } from "../Components/Nav/NavSlice";

export default configureStore({
    reducer: {
        navSlice: navSliceReducer
    }
})