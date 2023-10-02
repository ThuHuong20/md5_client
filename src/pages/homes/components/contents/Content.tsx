

import SaleCarousel from '../caro/Caro';
import './conten.scss'
import { useTranslation } from 'react-i18next'

export default function Content() {
    const { t } = useTranslation();

    return (
        <div className='container'>
            <div className='container_category'>
                <div className='container_category_text'>
                    <p>───</p>
                    <h1>SHOP BY CATEGORY</h1>
                    <p>───</p>
                </div>
                <div className='container_category_img'>
                    <div onClick={() => {
                        window.location.href = "http://localhost:5173/categories/8c362aed-c08a-463f-8547-87e6c4c7d66e";
                    }}>
                        <img src="../images/skincare.webp" alt="" />
                        <h2>SKINCARE</h2>
                        <button>{t('BuyNow')}</button>
                    </div>
                    <div onClick={() => {
                        window.location.href = "http://localhost:5173/categories/007a9eca-5c88-4d40-add2-d6dae26da9c3";
                    }}>
                        <img src="../images/makeup.webp" alt="" />
                        <h2>MEKEUP</h2>
                        <button>{t('BuyNow')}</button>
                    </div>
                    <div onClick={() => {
                        window.location.href = "http://localhost:5173/categories/f0350b39-8c05-4dd7-842b-c41c35b14d91";
                    }}>
                        <img src="../images/perfume.webp" alt="" />
                        <h2>PERFUME</h2>
                        <button>{t('BuyNow')}</button>
                    </div>
                </div>
            </div>
            <div className='container_sellers'>
                <div className='container_sellers_text'>
                    <p>───</p>
                    <h1>OUR BESTSELLERS</h1>
                    <p>───</p>
                </div>
                <SaleCarousel />
            </div>
            <div className='container_insta'>
                <div className='container_insta_img'>
                    <div className='container_insta_img_1'><img src="../images/new.jpg" alt="" /></div>
                    <div className='container_insta_img_2'>
                        <div style={{ marginRight: "180px", color: "#e23494" }}>
                            <p>NEW REFILLABLE</p>
                        </div>
                        <img src="../images/new1.jpg" alt="" />
                        <div style={{ marginTop: "20px" }}>
                            <h1>RÉNERGIE H.P.N. 300-PEPTIDE CREAM</h1>
                            <p>Reduce Sagging & Wrinkles</p>
                            <div className="start">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>
                        </div>

                        <div className="price">$75.20</div>
                        <div>
                            <button onClick={() => {
                                window.location.href = 'http://localhost:5173/products/41'
                            }}>ADD TO CART</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


