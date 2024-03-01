import { createAsyncThunk } from "@reduxjs/toolkit"

// import axios connection
import axios from "axios"
import { comparePassword, hashPassword } from "../../utils/hashingData";

const url = "http://localhost:4000/user"

export const getUser = createAsyncThunk(
    'user/getUser',
    async (requestData, { rejectWithValue }) => {
        try {
            let response
            if (requestData.token) {
                response = await axios.get(`${url}?token=${requestData.token}`)
            } else if (requestData.login && requestData.password) {
                response = await axios.get(`${url}?login=${requestData.login}`)
                if (response.data.length > 0) {
                    if(comparePassword(requestData.password, response.data[0].password)) {
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
            return response.data
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
                    return {login: "Login is already in use by another user"}
                }
            } else if (requestData.email) {
                response = await axios.get(`${url}?email=${requestData.email}`)
                if (response.data.length > 0) {
                    return {email: "Email is already in use by another user"}
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
            if (checkLoginResponse.data.length > 0 && checkEmailResponse.data.length > 0) {
                return rejectWithValue('A user with the same name or email already exists');
            }

            const hashedPassword = await hashPassword(requestData.password);
            const response = await axios.post(url, {
                login: requestData.login,
                password: hashedPassword,
                email: requestData.email,
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