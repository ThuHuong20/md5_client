import './footer.scss'
import { useTranslation } from 'react-i18next'
export default function Footer() {
    const { t } = useTranslation();
    return (
        <div className='footer'>
            <div className='footer_logo'>
                <div className='footer_logo_detail'>
                    <img src="../images/1.webp" alt="" />
                    <p style={{ marginTop: "20px" }}>{t("free")} <br />
                        {t("return")}</p>
                </div>
                <div className='footer_logo_detail'>
                    <img src="../images/2.webp" alt="" />
                    <p>{t("com")}<br />
                        {t("sample")} <br />{t("order")}</p>
                </div>
                <div className='footer_logo_detail'>
                    <img src="../images/3.webp" alt="" />
                    <p>{t("join")}<br />
                        {t("redeem")}</p>
                </div>
                <div className='footer_logo_detail'>
                    <img src="../images/4.webp" alt="" />
                    <p>{t("com")} <br />
                        {t("engra")}</p>
                </div>
            </div>
            <div className="l-footer__nav-inner footer_text">
                <ul className="l-footer__nav-list m-level-1 h-show-for-large">
                    <li className="l-footer__nav-item m-level-1"><a className="l-footer__nav-link m-level-1 hhhh" href="https://www.lancome-usa.com/customer-service-contact-us.html">{t("cus")}</a></li>
                    <li className="l-footer__nav-item m-level-1">
                        <ul className="l-footer__nav-list m-level-2">
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/customer-service-faqs.html">FAQ</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/customer-service-my-orders.html">{t("Order Status")}</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/customer-service-shipping-and-returns.html">{t("and")}</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/customer-service-terms-and-conditions.html">{t("term")}</a></li>
                            <li className="l-footer__nav-item m-level-2"><div id="livechat-footer-cust"></div></li>
                        </ul>
                    </li>
                </ul>
                <ul className="l-footer__nav-list m-level-1 h-show-for-large">
                    <li className="l-footer__nav-item m-level-1"><a className="l-footer__nav-link m-level-1" href="https://www.lancome-usa.com/sustainability.html">{t("lancome")}</a></li>
                    <li className="l-footer__nav-item m-level-1">
                        <ul className="l-footer__nav-list m-level-2">
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/sustainability.html">{t("program")}</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/live-responsibly.html">{t("live")}</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/bring-the-world-to-bloom.html">{t("bring")}</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/write-her-future.html">{t("write")}</a></li>
                        </ul>
                    </li>
                </ul>
                <ul className="l-footer__nav-list m-level-1 h-show-for-large">
                    <li className="l-footer__nav-item m-level-1"><a className="l-footer__nav-link m-level-1" href="https://www.lancome-usa.com/beauty-magazine.html">{t("beauty")}</a></li>
                    <li className="l-footer__nav-item m-level-1">
                        <ul className="l-footer__nav-list m-level-2">
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/beauty-magazine-skincare.html">{t("skin")}</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/beauty-magazine-makeup.html">{t("mekup")}</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/beauty-magazine-fragrance.html">{t("fran")}</a></li>
                        </ul>
                    </li>
                </ul>
                <ul className="l-footer__nav-list m-level-1 h-show-for-large">
                    <li className="l-footer__nav-item m-level-1"><a className="l-footer__nav-link m-level-1" href="https://www.lancome-usa.com/how-to-video-library.html">{t("tutor")}</a></li>
                    <li className="l-footer__nav-item m-level-1">
                        <ul className="l-footer__nav-list m-level-2">
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/how-to-skincare.html">{t("skin")}</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/how-to-makeup.html">{t("mekup")}</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/how-to-tips-and-tricks.html">{t("tip")}</a></li>
                        </ul>
                    </li>
                </ul>
                <div className='email_footer'>
                    <div className='email_signin'>
                        <p>{t("email")}</p>
                        <input type="text" placeholder={t("address")} />
                        <button>{t("submit")}</button>
                    </div>
                    <div className='email_follow'>
                        <h1>{t("follow")}</h1>
                        <div className='email_follow_icon'>
                            <i className="fa-brands fa-facebook"></i>
                            <i className="fa-brands fa-instagram"></i>
                            <i className="fa-brands fa-twitter"></i>
                            <i className="fa-brands fa-youtube"></i>
                            <i className="fa-brands fa-pinterest"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer_bottom'>
                <a href="https://www.lancome-usa.com/customer-service-shipping-and-returns.html">
                    <p style={{ marginTop: "7px" }}> Free shipping on orders $100+ and free returns on every order</p>
                </a>
            </div>
        </div>

    )
}
