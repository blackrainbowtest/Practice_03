import { createSlice } from "@reduxjs/toolkit"
import {  } from "./postAPI"

const initialState = {
    data: [],
    errorMessage: "",
    loading: false
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

// export slice to app/store
export default postSlice.reducer

export const {  } = postSlice.actions