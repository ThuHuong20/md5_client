import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Lazy Function */
import Lazy from '@utils/lazies/Lazy';

/* Components */
import Home from '@pages/homes/Home';

/* Route Setup */
import RouteProduct from "./RouteProduct";
import Body from "@/pages/homes/components/Body";
import Profile from "@/pages/profile/Profile";
import RouteAdmin from "./RouteAdmin";
import Cart from "@/pages/carts/Cart";
import Payment from "@/pages/carts/Payment";
import Recipts from "@/pages/carts/Recipts";
import CheckOrder from "@/pages/carts/CheckOrder";


// import RouteAuthen from "./RouteAuthen";

export default function RouteSetup() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home - Navbar + Footer */}
        <Route path="/" element={<Home></Home>}>
          <Route path="/" element={<Body />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="about" element={Lazy(() => import("@components/Test"))()}></Route>
          <Route path="infor" element={<>Thông Tin</>}></Route>
          <Route path="/login" element={Lazy(() => import("@pages/login/Login"))()}> </Route>
          <Route path="/register" element={Lazy(() => import("@/pages/register/Register"))()}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/recipt" element={<Recipts />}></Route>
          <Route path="/CheckOrder" element={<CheckOrder />}></Route>
          {RouteProduct}
        </Route>
        {RouteAdmin}
      </Routes>

    </BrowserRouter>
  )
}
