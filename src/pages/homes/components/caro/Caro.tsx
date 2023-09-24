
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Caro.scss"
import { useTranslation } from 'react-i18next';


export default function SaleCarousel() {
    const { t } = useTranslation();
    return (
        <section className="categories">

            <div className="container">
                {/* <div className='title_sale'>
                    <div className='title_sale_icon'>
                        <i style={{ fontSize: "22px", paddingLeft: "8px" }} className="fa-solid fa-gift"></i>
                        <h3 >{t("best_price")}</h3>
                    </div>
                </div> */}

                <div className="row" style={{ margin: "10px" }}>
                    <Carousel className="categories__slider owl-carousel"
                        autoPlay={true}
                        additionalTransfrom={0}
                        arrows
                        autoPlaySpeed={1500}
                        centerMode={false}

                        containerClass="container-with-dots"
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            desktop: {
                                breakpoint: {
                                    max: 3000,
                                    min: 1024
                                },
                                items: 4,
                                partialVisibilityGutter: 40
                            },
                            mobile: {
                                breakpoint: {
                                    max: 464,
                                    min: 0
                                },
                                items: 1,
                                partialVisibilityGutter: 30
                            },
                            tablet: {
                                breakpoint: {
                                    max: 1024,
                                    min: 464
                                },
                                items: 2,
                                partialVisibilityGutter: 30
                            }
                        }}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                    >

                        <div className='sale_carou'>
                            <div className='sale_carou_chirl' >
                                <p className='off'>Best Seller</p>
                                <img className="image" src="https://www.lancome-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lancome-us-master-catalog/default/dwb62da9ae/LCL_102020_Makeup_LashIdole_FullSizePDP_1000x1000.jpg?sw=270&sfrm=jpg&q=70" alt="" />
                                <div className="name" >
                                    <p>DÉFINICILS HIGH-DEFINITION MASCARA</p>
                                </div>
                                <div className="start">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                                <div className="price">$75.20</div>
                            </div>
                        </div>
                        <div className='sale_carou'>
                            <div className='sale_carou_chirl' >
                                <p className='off'>Best Seller</p>
                                <img className="image" src="https://www.lancome-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lancome-us-master-catalog/default/dwb62da9ae/LCL_102020_Makeup_LashIdole_FullSizePDP_1000x1000.jpg?sw=270&sfrm=jpg&q=70" alt="" />
                                <div className="name" >
                                    <p>DÉFINICILS HIGH-DEFINITION MASCARA</p>
                                </div>
                                <div className="start">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                                <div className="price">$75.20</div>
                            </div>
                        </div>
                        <div className='sale_carou'>
                            <div className='sale_carou_chirl' >
                                <p className='off'>Best Seller</p>
                                <img className="image" src="https://www.lancome-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lancome-us-master-catalog/default/dwb62da9ae/LCL_102020_Makeup_LashIdole_FullSizePDP_1000x1000.jpg?sw=270&sfrm=jpg&q=70" alt="" />
                                <div className="name" >
                                    <p>DÉFINICILS HIGH-DEFINITION MASCARA</p>
                                </div>
                                <div className="start">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                                <div className="price">$75.20</div>
                            </div>
                        </div>
                        <div className='sale_carou'>
                            <div className='sale_carou_chirl' >
                                <p className='off'>Best Seller</p>
                                <img className="image" src="https://www.lancome-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lancome-us-master-catalog/default/dwb62da9ae/LCL_102020_Makeup_LashIdole_FullSizePDP_1000x1000.jpg?sw=270&sfrm=jpg&q=70" alt="" />
                                <div className="name" >
                                    <p>DÉFINICILS HIGH-DEFINITION MASCARA</p>
                                </div>
                                <div className="start">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                                <div className="price">$75.20</div>
                            </div>
                        </div>
                        <div className='sale_carou'>
                            <div className='sale_carou_chirl' >
                                <p className='off'>Best Seller</p>
                                <img className="image" src="https://www.lancome-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lancome-us-master-catalog/default/dwb62da9ae/LCL_102020_Makeup_LashIdole_FullSizePDP_1000x1000.jpg?sw=270&sfrm=jpg&q=70" alt="" />
                                <div className="name" >
                                    <p>DÉFINICILS HIGH-DEFINITION MASCARA</p>
                                </div>
                                <div className="start">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                                <div className="price">$75.20</div>
                            </div>
                        </div>

                    </Carousel>
                </div>
            </div>
        </section >

    )
}
