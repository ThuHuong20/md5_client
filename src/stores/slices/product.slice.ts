import { createSlice } from "@reduxjs/toolkit";


export interface ProductState {
    data: any[];
}
const initialState: ProductState = {
    data: []
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state: ProductState, action) => {
            state.data.unshift(action.payload); // Thêm action.payload vào đầu mảng data
        },
        addProducts: (state: ProductState, action) => {
            state.data = [...action.payload]; // Ghi đè mảng data bằng action.payload
        },
    },
});

export const productActions = {
    ...productSlice.actions,
};

export const productReducer = productSlice.reducer;
