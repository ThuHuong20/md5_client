import { createSlice } from "@reduxjs/toolkit";
import { Products } from "./product.slice";


interface CartItemType {
    quantity: number,
    option: {
        id: string;
        name: string;
        productId: string;
        product: Products;
        product_option_images: {
            id: string;
            url: string;
        };
    };
}

interface GuestCartState {
    cart: CartItemType[]
}

const initialState: GuestCartState = {
    cart: []
}

const GuestCartSlice = createSlice({
    name: "guest-cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            return {
                ...state,
                cart: action.payload
            }
        }
    }
})

export const guestCartReducer = GuestCartSlice.reducer;
export const guestCartActions = GuestCartSlice.actions;