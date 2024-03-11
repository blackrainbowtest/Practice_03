import { createAsyncThunk } from "@reduxjs/toolkit"

// import axios connection
import axios from "axios"
import { DateNow, TimeNow } from "../../utils/timeNow";
import { convertImageToBase64 } from "../../utils/image";

const url = "http://localhost:4000/post"

export const getPost = createAsyncThunk(
    'post/getPost',
    async (_, { rejectWithValue }) => {
        try {
            let response
            response = await axios.get(`${url}`)
            return response.data

        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
);

export const addPost = createAsyncThunk(
    'post/addPost',
    async (requestData, { rejectWithValue }) => {
        try {
            const base64Images = await Promise.all(
                requestData.images.map(async (image) => await convertImageToBase64(image))
            );
            const sendData = {
                ...requestData,
                images: base64Images,
                createDate: DateNow(),
                createTime: TimeNow(),
                likes: []
            }
            const response = await axios.post(url, sendData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const likePost = createAsyncThunk(
    'post/likePost',
    async (requestData, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${url}/${requestData.id}`, { likes: requestData.likes });
            return response.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${url}/${id}`)
            return id
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const editPost = createAsyncThunk(
    'post/editPost',
    async (requestData, { rejectWithValue }) => {
        try {
            const base64Images = await Promise.all(
                requestData.images.map(async (image) => await convertImageToBase64(image)));
            const sendData = {
                ...requestData,
                images: base64Images,
            }
            const response = await axios.patch(`${url}/${requestData.id}`, sendData);
            return response.data;
        } catch (err) {
            console.log(err.message);
            return rejectWithValue(err.message)
        }
    }
)