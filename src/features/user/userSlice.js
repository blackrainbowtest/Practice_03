import { createSlice } from "@reduxjs/toolkit"
import { addUser, checkUser, getUser } from "./userAPI"

const initialState = {
    data: [],
    errorMessage: [],
    successMessage: ["sss"],
    loginErrors: {},
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
            state.isLogin = action.payload
        },
        setLoginErrors: (state, action) => {
            state.loginErrors = action.payload
        },
        setSuccessMessage: (state, action) => {
            state.successMessage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.isLogin = true
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = [...state.errorMessage, action.payload]
            })
            .addCase(addUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = [...state.errorMessage, action.payload]
            })
            .addCase(checkUser.pending, (state) => {
                state.loading = false;
            })
            .addCase(checkUser.fulfilled, (state, action) => {
                state.loading = false;
                state.loginErrors = {...state.loginErrors, ...action.payload};
            })
            .addCase(checkUser.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = [...state.errorMessage, action.payload]
            })
    }
})

// export slice to app/store
export default userSlice.reducer

export const { setError, setLogin, setLoginErrors, setSuccessMessage } = userSlice.actions