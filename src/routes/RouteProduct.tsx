// import Test from "@/components/Test";
import Lazy from "@/utils/lazies/Lazy";
import { Route } from "react-router-dom";

export default
  <Route>
    <Route path="/categories/:categoryId" element={Lazy(() => import("@pages/products/Product"))()}> </Route>
    <Route path="/products/:id" element={Lazy(() => import("@pages/products/productDetails/ProductDetail"))()}></Route>
  </Route>



