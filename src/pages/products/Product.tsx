
import './product.scss'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '@services/api'
interface Product {
  avatar: string;
  name: string;
  price: number;
  id: string;
}

export default function Product() {
  const { categoryId } = useParams();
  const [pageData, setPageData] = useState([]);
  console.log("pageData:", pageData)
  const navigate = useNavigate();
  useEffect(() => {
    if (categoryId) {
      api.productApi
        .findProductByCategory(categoryId)
        .then((res) => {
          if (res.status == 200) {
            setPageData(res.data.data);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          alert("sap server");
        });
    }

  }, [categoryId]);
  return (
    <div>
      <div className='container'>
        <div className='container_product'>
          <img src="https://www.lancome-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lancome-us-master-catalog/default/dwd2d0febc/3614272101456_TRESOR_A_LA_FOLIE.jpg?sw=270&sfrm=jpg&q=70" alt="" />
          <p style={{ fontWeight: "bold" }}>LA NUIT TRÉSOR À LA FOLIE EAU DE PARFUM</p>
          <p>Fiery Rose & Musky Vanilla</p>
          <div>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
          </div>
          <p>$90.00</p>
          <button>View Product</button>
        </div>

      </div>
    </div>
  )
}
