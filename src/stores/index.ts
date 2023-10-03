import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { commonReducer } from './slices/common.slice';
import { userReducer } from "./slices/user";
import { productReducer } from "./slices/product.slice";
import { categoryReducer } from './slices/category.slice';
import { guestCartReducer } from './slices/guestCart.slice';
// Kết hợp reducer
const rootReducer = combineReducers({
    commonStore: commonReducer,
    userStore: userReducer,
    productStore: productReducer,
    categoryStore: categoryReducer,
    guestCartStore: guestCartReducer
});

// Xuất ra store type
export type StoreType = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer
})

export default store