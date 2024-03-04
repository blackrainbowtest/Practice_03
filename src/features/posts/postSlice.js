import { createSlice } from "@reduxjs/toolkit"
import { getPost } from "./postAPI"

const initialState = {
    data: [],
    errorMessage: ["Post error"],
    successMessage: ["Post success"],
    loading: false
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPostErrors: (state, action) => {
            state.errorMessage = action.payload
        },
        setPostSuccessMessage: (state, action) => {
            state.successMessage = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getPost.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = [...state.errorMessage, action.payload]
            })
    }
})

// export slice to app/store
export default postSlice.reducer

export const { setPostErrors, setPostSuccessMessage } = postSlice.actions