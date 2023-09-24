//import { useTranslation } from 'react-i18next';
import './productDetail.scss'

export default function ProductDetail() {
  //const { t, i18n } = useTranslation();

  return (
    <div>

      <div key={Date.now() * Math.random()} className="detail_container">
        <div className="detail_img">
          <img
            style={{
              width: "400px",
              height: "300px",
              position: "relative",
            }}

            className="productImg"
            src="https://www.lancome-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lancome-us-master-catalog/default/dwca0679cc/Products/3147758029390%20_MIRACLE.jpg?sw=375&sh=375&sm=cut&sfrm=jpg&q=70"
            alt=""
          />
          <div className="detail_img_img" >

            <img src="https://www.lancome-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lancome-us-master-catalog/default/dwca0679cc/Products/3147758029390%20_MIRACLE.jpg?sw=375&sh=375&sm=cut&sfrm=jpg&q=70" alt="" />
            <img src="https://www.lancome-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lancome-us-master-catalog/default/dwca0679cc/Products/3147758029390%20_MIRACLE.jpg?sw=375&sh=375&sm=cut&sfrm=jpg&q=70" alt="" />
            <img src="https://www.lancome-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lancome-us-master-catalog/default/dwca0679cc/Products/3147758029390%20_MIRACLE.jpg?sw=375&sh=375&sm=cut&sfrm=jpg&q=70" alt="" />
          </div>

        </div>
        <div className="detail_content">
          <h1>MIRACLE EAU DE PARFUM</h1>
          <p>DEWY AND SPICY WITH FLORALS & FRUITS</p>
          <div className="quantity-container">
            <span
              style={{
                color: "rgb(206, 0, 88)",
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              $56.98
            </span>
            <div className="count_product">
              <button
                className="count"
                onClick={() => {

                }}
              >
                <span className="material-symbols-outlined">-</span>
              </button>

              <span className="quantity" style={{ fontSize: "25px" }}>
                8
              </span>
              <button
                className="count"
                onClick={() => {

                }}
              >
                <span className="material-symbols-outlined">+</span>
              </button>
            </div>
          </div>
          <div className="buttonAddCart">
            <button

              type="button"
              className="addToCart"
            >
              ADD TO CART
            </button>
            <br />
            <div style={{ marginTop: "30px" }} >
              <h3>Description</h3>
              <div> Empowering. Inspiring. Miracle is a sudden and marvelous revelation that life is extraordinary, that life is a miracle. This sensual, spicy floral fragrance </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
