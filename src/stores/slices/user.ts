import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { Products } from "./product.slice";

enum UserRole {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
}
enum UserStatus {
    ACTIVE = "ACTIVE",
    BANNED = "BANNED",
    TEMPORARY_BAN = "TEMPORARY_BAN"
}

enum ReceiptStatus {
    SHOPPING = "SHOPPING",
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    SHIPPING = "SHIPPING",
    DONE = "DONE"
}


export interface User {
    id: string;
    avatar: string;
    email: string;
    emailAuthentication: boolean;
    userName: string;
    password: string;
    role: UserRole;
    status: UserStatus;
    createAt: String;
    updateAt: String;
}

export interface Guest {
    id: string;
    name: string;
    numberPhone: string;
    email: string;
    receipts: Receipt[]
}

export interface ReceiptDetail {
    id: string;
    receiptId?: string,
    optionId: string,
    quantity: number,
    receipt: Receipt,
    option: {
        id: string,
        name: string,
        productId: string,
        product: Products;
        price: number;
        option: string;
    }
}

export interface Receipt {
    id: string;
    userId: string;
    guestId: string;
    user: User;
    guest: Guest;
    total: number;
    status: ReceiptStatus;
    createAt: string;
    accepted: string;
    shipAt: string;
    doneAt: string;
    detail: ReceiptDetail[]
}

export interface UserState {
    data: User | null;
    reload: boolean;
    socket: null | Socket;
    receipts: null | Receipt[];
    cart: null | Receipt;
    cartPayQr: null | string;

}

export const initialState: UserState = {
    data: null,
    reload: false,
    socket: null,
    receipts: null,
    cart: null,
    cartPayQr: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setData: function (state, action) {
            return {
                ...state,
                data: action.payload
            }
        },
        setSocket: function (state, action) {
            return {
                ...state,
                socket: action.payload
            }
        },
        setReceipt: function (state, action) {
            return {
                ...state,
                receipts: action.payload
            }
        },
        setCart: function (state, action) {
            return {
                ...state,
                cart: action.payload
            }
        },
        setCartPayQr: function (state, action) {
            return {
                ...state,
                cartPayQr: action.payload
            }
        },
        reload: function (state) {
            return {
                ...state,
                reload: !state.reload
            }
        },


    }
})

export const userAction = {
    ...userSlice.actions
}

export const userReducer = userSlice.reducer