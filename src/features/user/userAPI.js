import { createAsyncThunk } from "@reduxjs/toolkit"

// import axios connection
import axios from "axios"

const url = "http://localhost:4000/user"

export const getUser = createAsyncThunk(
    'user/getUser',
    async (requestData, { rejectWithValue }) => {
        try {
            let response

            if (requestData.token) {
                response = await axios.get(`${url}?token=${requestData.token}`)
            } else if (requestData.login && requestData.password) {
                response = await axios.get(`${url}?login=${requestData.login}&password=${requestData.password}`)
            } else {
                throw new Error('Неверные параметры запроса')
            }

            return response.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
);