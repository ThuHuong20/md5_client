import './banner.scss'
import { useTranslation } from 'react-i18next'
export default function Banner() {
    const { t } = useTranslation();
    return (
        // <div
        //     id="carouselExampleIndicators"
        //     className="carousel slide"
        //     data-ride="carousel"
        // >
        //     <ol className="carousel-indicators">
        //         <li
        //             data-target="#carouselExampleIndicators"
        //             data-slide-to={0}
        //             className="active"
        //         />
        //         <li data-target="#carouselExampleIndicators" data-slide-to={1} />
        //         <li data-target="#carouselExampleIndicators" data-slide-to={2} />
        //     </ol>
        //     <div className="carousel-inner">
        //         <div className="carousel-item active">
        //             <img className="d-block w-100" src="../images/banner1.webp" alt="First slide" />
        //             <div className="carousel-caption">
        //                 <h1>{t('CAKESFORDELIVERYMELBOURNE')}</h1>
        //                 <p>{t('$5DELIVERYTOALLMELBOURNEMETROAREAS')}</p>
        //                 <button>{t('ORDERNOW')}</button>
        //             </div>
        //         </div>
        //         <div className="carousel-item">
        //             <img className="d-block w-100" src="../images/banner3.webp" alt="Second slide" />
        //             <div className="carousel-caption">
        //                 <h1>{t('CAKESFORDELIVERYMELBOURNE')}</h1>
        //                 <p>{t('$5DELIVERYTOALLMELBOURNEMETROAREAS')}</p>
        //                 <button>{t('ORDERNOW')}</button>
        //             </div>
        //         </div>
        //         <div className="carousel-item">
        //             <img className="d-block w-100" src="../images/banner2.webp" alt="Third slide" />
        //             <div className="carousel-caption">
        //                 <h1>{t('CAKESFORDELIVERYMELBOURNE')}</h1>
        //                 <p>{t('$5DELIVERYTOALLMELBOURNEMETROAREAS')}</p>
        //                 <button>{t('ORDERNOW')}</button>
        //             </div>
        //         </div>
        //     </div>
        //     <a
        //         className="carousel-control-prev"
        //         href="#carouselExampleIndicators"
        //         role="button"
        //         data-slide="prev"
        //     >
        //         <span className="carousel-control-prev-icon" aria-hidden="true" />
        //         <span className="sr-only">Previous</span>
        //     </a>
        //     <a
        //         className="carousel-control-next"
        //         href="#carouselExampleIndicators"
        //         role="button"
        //         data-slide="next"
        //     >
        //         <span className="carousel-control-next-icon" aria-hidden="true" />
        //         <span className="sr-only">Next</span>
        //     </a>
        // </div>
        <div>
            <img src="../images/HeroBanner.webp" alt="" />
            <img src="../images/banner2.jpg" alt="" />
        </div>
    )
}
