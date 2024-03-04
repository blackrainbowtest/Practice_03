import { createAsyncThunk } from "@reduxjs/toolkit"

// import axios connection
import axios from "axios"
import { DateNow, TimeNow } from "../../utils/timeNow";

const url = "http://localhost:4000/post"

export const getPost = createAsyncThunk(
    'user/getPost',
    async (requestData, { rejectWithValue }) => {
        try {
            let response
            response = await axios.get(`${url}`)
            return response.data

        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
);