import {configureStore} from "@reduxjs/toolkit"
import PostSlice from "./features/PostSlice"
export default configureStore({
    reducer:{
     post:PostSlice,
    }
})