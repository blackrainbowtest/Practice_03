import { createSlice } from "@reduxjs/toolkit"
import { getPost } from "./postAPI"

const initialState = {
    data: [],
    errorMessage: [],
    successMessage: [],
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
                state.errorMessage = [...state.errorMessage, {id: state.errorMessage.length > 0 ? state.errorMessage[state.errorMessage.length - 1].id + 1 : 1, message: action.payload, exit: false}]
            })
    }
})

// export slice to app/store
export default postSlice.reducer

export const { setPostErrors, setPostSuccessMessage } = postSlice.actions