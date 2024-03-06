import { createSlice } from "@reduxjs/toolkit"
import { addPost, deletePost, getPost, likePost } from "./postAPI"

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
            .addCase(addPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.loading = false;
                state.data = [...state.data, action.payload];
            })
            .addCase(addPost.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = [...state.errorMessage, {id: state.errorMessage.length > 0 ? state.errorMessage[state.errorMessage.length - 1].id + 1 : 1, message: action.payload, exit: false}]
            })
            .addCase(likePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.map(elm => elm.id === action.payload.id ? action.payload : elm)
            })
            .addCase(likePost.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = [...state.errorMessage, {id: state.errorMessage.length > 0 ? state.errorMessage[state.errorMessage.length - 1].id + 1 : 1, message: action.payload, exit: false}]
            })
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter(elm => elm.id !== action.payload)
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = [...state.errorMessage, {id: state.errorMessage.length > 0 ? state.errorMessage[state.errorMessage.length - 1].id + 1 : 1, message: action.payload, exit: false}]
            })
    }
})

// export slice to app/store
export default postSlice.reducer

export const { setPostErrors, setPostSuccessMessage } = postSlice.actions