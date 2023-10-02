//import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import './productDetail.scss'
import { useEffect, useState } from 'react';
import api from '@/services/api';
import { Products } from '@/stores/slices/product.slice';
import { useSelector, useStore } from 'react-redux';
import { StoreType } from '@/stores';
import user from '@/services/api/modules/user';
import { message } from 'antd';
import { ReceiptDetail } from '@/stores/slices/user';

export default function ProductDetail() {
  //const { t, i18n } = useTranslation();

  const { id } = useParams();
  const [products, setProducts] = useState<Products>();

  const [optionIndex, setOptionIndex] = useState(0)

  const [quantity, setQuantity] = useState(1);



  useEffect(() => {
    if (id) {
      api.productApi
        .findProductById(id)
        .then((res) => {
          console.log(" res:", res.data)
          if (res.status == 200) {
            setProducts(res.data.data);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          alert("sap server");
        });
    }

  }, [id]);

  const userStore = useSelector((store: StoreType) => {
    return store.userStore
  })



  const handleAddToCart = () => {
    const cart = userStore.cart?.detail;
    if (cart && products && products.productOption && products.productOption[optionIndex]) {
      const selectedProductOption = products.productOption[optionIndex];
      const foundItem = cart.find((item: ReceiptDetail) => item.optionId === selectedProductOption.id);

      if (foundItem) {
        const total = foundItem.quantity + quantity;
        if (userStore.socket) {
          userStore.socket.emit("addToCart", {
            receiptId: userStore.cart?.id,
            optionId: selectedProductOption.id,
            quantity: total
          });
          message.success("Add To Cart Successfully");
        }

      } else {
        if (userStore.socket) {
          userStore.socket.emit("addToCart", {
            receiptId: userStore.cart?.id,
            optionId: selectedProductOption.id,
            quantity: quantity,
          });
          message.success("Add To Cart Successfully");
        }

      }
    }
  }
  useEffect(() => {
    console.log("userStore.cart", userStore.cart);

  }, [userStore.cart])

  return (
    <div>

      <div key={Date.now() * Math.random()} className="detail_container">
        <div className="detail_img">
          <img
            style={{
              width: "400px",
              height: "400px",
              position: "relative",
            }}

            className="productImg"
            src={products?.avatar}
            alt=""
          />
          {/* <div className="detail_img_img" >

            <img src="https://www.lancome-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lancome-us-master-catalog/default/dwca0679cc/Products/3147758029390%20_MIRACLE.jpg?sw=375&sh=375&sm=cut&sfrm=jpg&q=70" alt="" />
            <img src="https://www.lancome-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lancome-us-master-catalog/default/dwca0679cc/Products/3147758029390%20_MIRACLE.jpg?sw=375&sh=375&sm=cut&sfrm=jpg&q=70" alt="" />
            <img src="https://www.lancome-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lancome-us-master-catalog/default/dwca0679cc/Products/3147758029390%20_MIRACLE.jpg?sw=375&sh=375&sm=cut&sfrm=jpg&q=70" alt="" />
          </div> */}

        </div>
        <div className="detail_content">
          <h1>{products?.name}</h1>
          <p>{products?.type}</p>
          <div className="quantity-container">
            <span
              style={{
                color: "rgb(206, 0, 88)",
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              ${products?.productOption[optionIndex].price}
            </span>
            <div className="count_product">
              <button
                className="count"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                <span className="material-symbols-outlined">-</span>
              </button>

              <span className="quantity" style={{ fontSize: "25px" }}>
                {quantity}
              </span>
              <button
                className="count"
                onClick={() => {
                  if (quantity > 0) {
                    setQuantity(quantity + 1);
                  }
                }}
              >
                <span className="material-symbols-outlined">+</span>
              </button>


            </div>
          </div>
          <div className='option_container'>
            {products?.productOption.map((option: any, index) => {
              return (
                products?.productOption.length != 0 &&
                <button
                  style={{
                    backgroundColor: optionIndex === index ? 'rgb(206, 0, 88)' : 'none', // Change 'blue' to your desired color
                    color: optionIndex === index ? 'white' : 'black', // Change 'white' to your desired color
                  }}
                  onClick={() => {
                    setOptionIndex(index)
                    setQuantity(1)
                  }} key={option.id}>{option.option}</button>
              )
            })}


          </div>
          <div className="buttonAddCart">
            <button

              type="button"
              className="addToCart"
              onClick={() => {
                handleAddToCart()
              }}
            >
              ADD TO CART
            </button>
            <br />
            <div style={{ marginTop: "30px" }} >
              <h3>Description</h3>
              <div> {products?.des}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
