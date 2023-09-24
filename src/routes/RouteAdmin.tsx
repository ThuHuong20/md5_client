import ListProduct from "@/pages/admin/adminManager/ListProduct";
import ProductManager from "@/pages/admin/adminManager/ProductManager";
import UserManager from "@/pages/admin/adminManager/UserManager";
import Lazy from "@/utils/lazies/Lazy";
import { Route } from "react-router-dom";
import GuestDetails from "@/pages/admin/adminManager/GuestDetails";

export default
    <Route path="/admin" element={Lazy(() => import("@pages/admin/Admin"))()}>
        <Route path="productManager" element={<ProductManager />} />
        <Route path="listProduct" element={<ListProduct />} />
        <Route path="userManager" element={<UserManager />} />
        <Route path="guestDetails/:orderId" element={<GuestDetails />}></Route>
    </Route>