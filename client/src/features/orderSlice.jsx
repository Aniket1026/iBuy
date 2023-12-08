import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../contants/constant";
const URL = BACKEND_URL;

const config = {
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
};

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: null,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(createOrder.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.status = action.payload.success;
            state.order = action.payload.order;
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    }
    
});

export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (orderData, thunkAPI) => {
        try {
            const response = await axios.post(
                `${URL}/order/create`,
                orderData,
                config
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export default orderSlice.reducer;
    