import { createSlice } from "@reduxjs/toolkit";

export interface Option {
    id: string;
    productId: string;
    price: number;
    //status: boolean;
    title: string;
    // pictures: Picture[]
}
export interface Products {
    id: string;
    name: string;
    des: string;
    type: string;
    active: Boolean;
    categoryId: String;
    avatar: string;
    productOption: Option[]

}
//const initialState: null | Products = null;
const initialState: {
    data: null | undefined | Products[]
} = {
    data: null
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        insertProduct: function (state, action) {
            state.data?.unshift(action.payload)
        },
        setDataApi: function (state, action) {
            return {
                ...state,
                data: action.payload
            }
        },
        insertOptionProduct: function (state, action) {
            return {
                ...state,
                data: state.data?.map((product) => {
                    if (product.id === action.payload.productId) {
                        return {
                            ...product,
                            options: [...product.productOption, action.payload]
                        };
                    }
                    return product;
                })
            };
        },

    },
});

export const productActions = {
    ...productSlice.actions,
};

export const productReducer = productSlice.reducer;
