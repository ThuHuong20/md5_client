
import './product.scss'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '@services/api'



export default function Product() {



  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      api.productApi
        .findProductByCategory(categoryId)
        .then((res) => {
          console.log(" res:", res.data)
          if (res.status == 200) {
            setProducts(res.data.products);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          alert("sap server");
        });
    }

  }, [categoryId]);
  console.log("products:", products)
  return (
    <div>
      <div className='container'>
        {products?.map((item: any) => (
          <div key={Date.now() * Math.random()} className='container_product'
            onClick={() => navigate(`/products/${item.id}`)}>
            <img src={item.avatar} alt="" />
            <p style={{ fontWeight: "bold" }}>{item.name}</p>
            <p>{item.type}</p>
            <div>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <p>${item?.productOption[0]?.price}</p>

            <button>View Product</button>
          </div>
        ))}


      </div>
    </div>
  )
}
