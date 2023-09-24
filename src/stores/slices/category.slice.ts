
import { createSlice } from "@reduxjs/toolkit";

export interface CategoryState {

    id: number;
    title: string;
    avartar: string
    status: Boolean;
    //products: Product[]
}
const initialState: null | CategoryState = null;

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        getCategory: function (state, action) {
            return action.payload
        },
    },
});

export const categoryActions = {
    ...categorySlice.actions,
};

export const categoryReducer = categorySlice.reducer