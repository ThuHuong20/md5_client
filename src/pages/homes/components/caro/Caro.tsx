
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Caro.scss"
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { StoreType } from "@/stores";
import { Products } from "@/stores/slices/product.slice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/services/api";



export default function SaleCarousel() {

    const navigate = useNavigate()
    const [maxItemPage, setMaxItemPage] = useState(7);
    const [skipItem, setSkipItem] = useState(0);
    const [maxPage, setMaxPage] = useState<any[]>([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        api.productApi.findMany(maxItemPage, skipItem)
            .then(res => {
                if (res.status == 200) {
                    console.log("res.data", res.data)
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    setSkipItem(res.data.data.length)
                    setProducts(res.data.data)
                }
            })
    }, [])
    console.log("products", products);

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
                        {products?.map((item: Products) => (
                            <div onClick={() => navigate(`/products/${item.id}`)} className='sale_carou'>
                                <div key={Date.now() * Math.random()} className='sale_carou_chirl' >
                                    <p className='off'>Best Seller</p>
                                    <img className="image" src={item.avatar} alt="" />
                                    <div className="name" >
                                        <p>{item.name}</p>
                                        <p>{item.type}</p>
                                    </div>
                                    <div className="start">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                    </div>
                                    <div className="price">${item?.productOption[0]?.price}</div>
                                </div>
                            </div>
                        ))}

                    </Carousel>
                </div>
            </div>
        </section >

    )
}
