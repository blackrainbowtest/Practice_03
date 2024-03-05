import { createSlice } from "@reduxjs/toolkit"
import { addUser, checkUser, getUser, patchUser } from "./userAPI"

const initialState = {
    data: [],
    errorMessage: [],
    successMessage: [],
    loginErrors: {},
    loading: false,
    isLogin: false,
    isRemember: false,
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
        },
        setIsRemember: (state, action) => {
            state.isRemember = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
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
                if (!state.successMessage.some((msg) => msg.message === `User ${action.payload.login} enter success.`)) {
                    state.successMessage = [...state.successMessage, { id: state.successMessage.length > 0 ? state.successMessage[state.successMessage.length - 1].id + 1 : 1, message: `User ${action.payload.login} enter success.`, exit: false }]
                }
                if (state.isRemember) {
                    localStorage.setItem('accessToken', action.payload.token);
                }
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = [...state.errorMessage, { id: state.errorMessage.length > 0 ? state.errorMessage[state.errorMessage.length - 1].id + 1 : 1, message: action.payload, exit: false }]
                localStorage.removeItem('accessToken');
            })
            .addCase(patchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(patchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(patchUser.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = [...state.errorMessage, { id: state.errorMessage.length > 0 ? state.errorMessage[state.errorMessage.length - 1].id + 1 : 1, message: action.payload, exit: false }]
            })
            .addCase(addUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.isLogin = true
                localStorage.removeItem('accessToken');
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = [...state.errorMessage, { id: state.errorMessage.length > 0 ? state.errorMessage[state.errorMessage.length - 1].id + 1 : 1, message: action.payload, exit: false }]
                localStorage.removeItem('accessToken');
            })
            .addCase(checkUser.pending, (state) => {
                state.loading = false;
            })
            .addCase(checkUser.fulfilled, (state, action) => {
                state.loading = false;
                state.loginErrors = { ...state.loginErrors, ...action.payload };
            })
            .addCase(checkUser.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = [...state.errorMessage, { id: state.errorMessage.length > 0 ? state.errorMessage[state.errorMessage.length - 1].id + 1 : 1, message: action.payload, exit: false }]
            })
    }
})

// export slice to app/store
export default userSlice.reducer

export const { setError, setLogin, setLoginErrors, setSuccessMessage, setIsRemember } = userSlice.actions