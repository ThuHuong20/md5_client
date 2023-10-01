import ListProduct from "@/pages/admin/adminManager/ListProduct";
import ProductManager from "@/pages/admin/adminManager/ProductManager";
import UserManager from "@/pages/admin/adminManager/UserManager";
import Lazy from "@/utils/lazies/Lazy";
import { Route } from "react-router-dom";
import GuestDetails from "@/pages/admin/adminManager/UserReceiptDetails";
import ProductOption from "@/pages/admin/adminManager/ProductOption";

export default
    <Route path="/admin" element={Lazy(() => import("@pages/admin/Admin"))()}>
        <Route path="productManager" element={<ProductManager />} />
        <Route path="productOption/:productId" element={<ProductOption />} />
        <Route path="listProduct" element={<ListProduct />} />
        <Route path="userManager" element={<UserManager />} />
        <Route path="receiptDetails/:receiptId" element={<GuestDetails />}></Route>
    </Route>