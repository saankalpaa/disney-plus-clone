import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import movieReducer from "../features/movie/movieSlice";
import listReducer from "../features/list/listSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer,
        list: listReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});