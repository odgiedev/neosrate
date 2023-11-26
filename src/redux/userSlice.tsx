import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        // isLogged: localStorage.getItem('authenticated') ? localStorage.getItem('authenticated') : "",
        // token: localStogitrage.getItem('token') ? localStorage.getItem('token') : "guest",
        userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : "",
        username: localStorage.getItem('username') ? localStorage.getItem('username') : "guest",
    },
    reducers: {
        // setUser(state, { payload }) {
        //     return {...state, isLogged: "true", userId: payload.userId, username: payload.username, token: payload.token};
        // },
    }
});

// export const {setUser, logOut} = userSlice.actions;

export default userSlice.reducer;