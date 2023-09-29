import './footer.scss'
import { useTranslation } from 'react-i18next'
export default function Footer() {
    const { t } = useTranslation();
    return (
        <div className='footer'>
            <div className='footer_logo'>
                <div className='footer_logo_detail'>
                    <img src="../images/1.webp" alt="" />
                    <p style={{ marginTop: "20px" }}>Free shipping for orders <br />
                        $100+ and free returns</p>
                </div>
                <div className='footer_logo_detail'>
                    <img src="../images/2.webp" alt="" />
                    <p>Complimentary<br />
                        samples with every <br />order</p>
                </div>
                <div className='footer_logo_detail'>
                    <img src="../images/3.webp" alt="" />
                    <p>Join My Lancôme Rewards <br />
                        redeem exclusive offers</p>
                </div>
                <div className='footer_logo_detail'>
                    <img src="../images/4.webp" alt="" />
                    <p>Complimentary <br />
                        engraving</p>
                </div>
            </div>
            <div className="l-footer__nav-inner footer_text">
                <ul className="l-footer__nav-list m-level-1 h-show-for-large">
                    <li className="l-footer__nav-item m-level-1"><a className="l-footer__nav-link m-level-1 hhhh" href="https://www.lancome-usa.com/customer-service-contact-us.html">CUSTOMER CARE</a></li>
                    <li className="l-footer__nav-item m-level-1">
                        <ul className="l-footer__nav-list m-level-2">
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/customer-service-faqs.html">FAQ</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/customer-service-my-orders.html">Order Status</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/customer-service-shipping-and-returns.html">Shipping and Returns</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/customer-service-terms-and-conditions.html">Terms &amp; Conditions</a></li>
                            <li className="l-footer__nav-item m-level-2"><div id="livechat-footer-cust"></div></li>
                        </ul>
                    </li>
                </ul>
                <ul className="l-footer__nav-list m-level-1 h-show-for-large">
                    <li className="l-footer__nav-item m-level-1"><a className="l-footer__nav-link m-level-1" href="https://www.lancome-usa.com/sustainability.html">ABOUT LANCÔME</a></li>
                    <li className="l-footer__nav-item m-level-1">
                        <ul className="l-footer__nav-list m-level-2">
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/sustainability.html">Sustainability Program</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/live-responsibly.html">Live Responsibly</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/bring-the-world-to-bloom.html">Bring the World to Bloom</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/write-her-future.html">Write Her Future</a></li>
                        </ul>
                    </li>
                </ul>
                <ul className="l-footer__nav-list m-level-1 h-show-for-large">
                    <li className="l-footer__nav-item m-level-1"><a className="l-footer__nav-link m-level-1" href="https://www.lancome-usa.com/beauty-magazine.html">BEAUTY MAGAZINE</a></li>
                    <li className="l-footer__nav-item m-level-1">
                        <ul className="l-footer__nav-list m-level-2">
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/beauty-magazine-skincare.html">Skincare</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/beauty-magazine-makeup.html">Makeup</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/beauty-magazine-fragrance.html">Fragrance</a></li>
                        </ul>
                    </li>
                </ul>
                <ul className="l-footer__nav-list m-level-1 h-show-for-large">
                    <li className="l-footer__nav-item m-level-1"><a className="l-footer__nav-link m-level-1" href="https://www.lancome-usa.com/how-to-video-library.html">BEAUTY TUTORIALS</a></li>
                    <li className="l-footer__nav-item m-level-1">
                        <ul className="l-footer__nav-list m-level-2">
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/how-to-skincare.html">Skincare</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/how-to-makeup.html">Makeup</a></li>
                            <li className="l-footer__nav-item m-level-2"><a className="l-footer__nav-link m-level-2" href="https://www.lancome-usa.com/how-to-tips-and-tricks.html">Tips &amp; Tricks</a></li>
                        </ul>
                    </li>
                </ul>
                <div className='email_footer'>
                    <div className='email_signin'>
                        <p>Email sign up</p>
                        <input type="text" placeholder='Your Email Address' />
                        <button>Submit</button>
                    </div>
                    <div className='email_follow'>
                        <h1>Follow Us</h1>
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
