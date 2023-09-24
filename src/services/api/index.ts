import userModule from "./modules/user";
import "./axios.instance";
import categoryModule from "./modules/category.module"
import productModule from "./modules/product.module";
import purchaseModules from "./modules/purchase.modules";
export default {
    userApi: userModule,
    categoryApi: categoryModule,
    productApi: productModule,
    purchaseApi: purchaseModules
};
