import { createSlice } from "@reduxjs/toolkit"
import {  } from "./userAPI"

const initialState = {
    data: [],
    errorMessage: "",
    loading: false,
    isLogin: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.errorMessage = action.payload
        },
        setLogin: (state, action) => {
            state.currentItem = action.payload
        },
    },
    extraReducers: (builder) => {

    }
})

// export slice to app/store
export default userSlice.reducer

export const { setError, setLogin } = userSlice.actions