import { createAsyncThunk } from "@reduxjs/toolkit"

// import axios connection
import axios from "axios"
import { comparePassword, hashPassword } from "../../utils/hashingData";
import { DateNow } from "../../utils/timeNow";

const url = "http://localhost:4000/user"

export const getUser = createAsyncThunk(
    'user/getUser',
    async (requestData, { rejectWithValue }) => {
        try {
            let response
            if (requestData.token) {
                response = await axios.get(`${url}?token=${requestData.token}`)
                if (response.data.length > 0) {
                    response = await axios.patch(`${url}/${response.data[0].id}`, {lastOnlineDate: DateNow()})
                    return response.data
                } else {
                    return rejectWithValue('Invalid token, please log in');
                }
            } else if (requestData.login && requestData.password) {
                response = await axios.get(`${url}?login=${requestData.login}`)
                if (response.data.length > 0) {
                    if (comparePassword(requestData.password, response.data[0].password)) {
                        const hashedToken = await hashPassword(String(Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)))
                        response = await axios.patch(`${url}/${response.data[0].id}`, { token: hashedToken, lastOnlineDate: DateNow() })
                        return response.data
                    } else {
                        return rejectWithValue('Wrong login or password')
                    }
                } else {
                    return rejectWithValue('Wrong login or password')
                }
            } else {
                return rejectWithValue('Invalid request parameters')
            }
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
);

export const checkUser = createAsyncThunk(
    'user/checkUser',
    async (requestData, { rejectWithValue }) => {
        try {
            let response

            if (requestData.login) {
                response = await axios.get(`${url}?login=${requestData.login}`)
                if (response.data.length > 0) {
                    return { login: "Login is already in use by another user" }
                }
            } else if (requestData.email) {
                response = await axios.get(`${url}?email=${requestData.email}`)
                if (response.data.length > 0) {
                    return { email: "Email is already in use by another user" }
                }
            } else {
                return rejectWithValue('Unknown error #41');
            }
            return false
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
);

export const addUser = createAsyncThunk(
    'user/addUser',
    async (requestData, { rejectWithValue }) => {
        try {
            const checkLoginResponse = await axios.get(`${url}?login=${requestData.login}`);
            const checkEmailResponse = await axios.get(`${url}?email=${requestData.email}`);
            if (checkLoginResponse.data.length > 0 || checkEmailResponse.data.length > 0) {
                return rejectWithValue('A user with the same name or email already exists');
            }

            const hashedPassword = await hashPassword(requestData.password);
            const hashedToken = await hashPassword(String(Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)))
            const response = await axios.post(url, {
                login: requestData.login,
                password: hashedPassword,
                email: requestData.email,
                token: hashedToken,
                registrationDate: DateNow(),
                lastOnlineDate: DateNow(),
                accountImage: "",
                userName: "",
                userSurname: "",
                userBirthday: ""
            });
            if (response.data.id) {
                return response.data;
            } else {
                return rejectWithValue('Failed to create user');
            }
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const patchUser = createAsyncThunk(
    'user/patchUser',
    async (requestData, { rejectWithValue }) => {
        try {
            let hashedPassword
            if (requestData.password) {
                hashedPassword = await hashPassword(requestData.password);
            }
            const response = await axios.patch(`${url}/${requestData.id}`, {
                ...requestData,
                ...(requestData.password !== undefined && { password: hashedPassword }),
                lastOnlineDate: DateNow()
            });
            if (response.data.id) {
                return response.data;
            } else {
                return rejectWithValue('Failed to patch user');
            }
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)