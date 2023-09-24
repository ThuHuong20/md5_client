import './cart.scss'
import { useEffect, useState } from 'react'
import api from '@services/api'
import { Spin, Modal } from 'antd';
import Loading from '../components/Loading';
import { LoadingOutlined } from '@ant-design/icons';
interface Product {
    id: string;
    name: string;
    avatar: string;
    price: number;
    des: string;
    categoryId: string;
    productPictures: {
        id: string;
        path: string;
    }[]
}
interface CartItem {
    productId: string;
    quantity: number;
}
interface CartItemDetail extends CartItem {
    productDetail: Product
}

interface newGuestReceipt {

    email: string;
    phoneNumber: string;
    total: number;
    payMode: string;

}
export default function Payment() {
    const [load, setLoad] = useState(false);
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );
    const [cart, setCart] = useState<CartItemDetail[]>([]);
    console.log("cartpayment:", cart)
    // Validation states
    const [nameValid, setNameValid] = useState(false);
    const [phoneNumberValid, setPhoneNumberValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    useEffect(() => {
        async function formatCartPay() {
            let cartTemp: CartItemDetail[] = [];
            let carts: CartItem[] = JSON.parse(localStorage.getItem("carts") ?? "[]");
            for (let i in carts) {
                let productDetail = await api.productApi.findProductById(carts[i].productId).then(res => res.data.data)
                cartTemp.push({
                    ...carts[i],
                    productDetail
                })
            }
            setCart(cartTemp);
            //localStorage.setItem("carts", JSON.stringify(cart));
        }

        formatCartPay();
    }, []);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    function handleOrder() {
        // Check if all fields are valid
        if (nameValid && phoneNumberValid && emailValid) {
            let newGuestReceipt: newGuestReceipt = {
                email: email,
                phoneNumber: phoneNumber,
                total: cart.reduce((value, cur) => {
                    return value + cur.quantity * cur.productDetail.price;
                }, 0),
                payMode: "CASH",
            };

            let guestReceiptDetailList = JSON.parse(localStorage.getItem("carts") ?? "[]");
            setLoad(true)
            api.purchaseApi.createGuestReceipt(newGuestReceipt, guestReceiptDetailList)
                .then(res => {
                    console.log("res", res.data)
                    localStorage.removeItem("carts");

                    Modal.success({
                        onOk: () => {
                            window.location.href = '/';
                        },
                        content: "Order Success, check Receipt at Email...",
                    });

                })

                .catch(err => {
                    setLoad(false)
                    Modal.error({
                        content: "Order failed. Please try again later.",
                    });
                });

            setLoad(true)
        } else {
            setLoad(true)
            Modal.error({
                content: "Please fill out all required fields correctly.",
            });
        }

    }
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-11">
                    <div className="card card0 rounded-0">
                        <div className="row boder">
                            <div className="col-md-5 d-md-block d-none p-0 box">
                                <div className="card rounded-0 border-0 card1" id="bill">
                                    <h3 id="heading1">Payment Summary</h3>
                                    {cart.map(item => (
                                        <div key={item.productId} className="row">
                                            <div className="col-lg-7 col-8 mt-4 line pl-4">
                                                <h2 className="bill-head">{item.productDetail.name}</h2>
                                                <small className="bill-date">item: {item.quantity}</small>
                                            </div>
                                            <div className="col-lg-5 col-4 mt-4">
                                                <h2 className="bill-head px-xl-5 px-lg-4">${item.productDetail.price}</h2>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="row">
                                        <div className="col-md-12 red-bg">
                                            <p className="bill-date" id="total-label">
                                                Total Price
                                            </p>
                                            <h2 className="bill-head" id="total">
                                                ${cart
                                                    ? cart.reduce((value, nextItem) => {
                                                        return (value += nextItem.quantity * nextItem.productDetail.price);
                                                    }, 0)
                                                    : ''}
                                            </h2>
                                            <small className="bill-date" id="total-label">
                                                Price includes all taxes
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7 col-sm-12 p-0 box">
                                <div style={{ backgroundColor: "rgb(238, 238, 238)" }} className="card2" id="paypage">
                                    <div className="form-card">
                                        <h2 id="heading2" className="text-danger">
                                            Payment Method
                                        </h2>
                                        <div style={{ display: "flex", marginTop: "10px" }}>

                                        </div>
                                        <div className="radio" data-value="paypal">
                                            <img style={{
                                                width: "100px",
                                                height: "47px"
                                            }}
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLvxf3SYHiCC3ypAG2ejZ7ABGlOjG3Gm58uQ&usqp=CAU"
                                                width="100px"
                                                height="10px"
                                            />
                                        </div>
                                        {/* <div className="radio" data-value="credit">
                                                <img
                                                    src="https://blogchiasekienthuc.com/wp-content/uploads/2019/07/su-dung-dich-vu-zalopay.png"
                                                    width="100px"
                                                    height="20px"
                                                />
                                            </div> */}
                                        <br />
                                        <label className="pay">Name</label>
                                        <input type="text" name="name" placeholder="Name" onChange={(e) => {

                                            setNameValid(e.target.value.trim() !== ''); // Check if the name is not empty
                                        }}
                                            className={nameValid ? 'valid' : 'invalid'} />
                                        <div className="row">
                                            <div className="col-8 col-md-6">
                                                <label className="pay">SDT</label>
                                                <input
                                                    type="text"
                                                    name="phoneNumber"
                                                    id="cr_no"
                                                    placeholder="0000-0000-0000-0000"
                                                    minLength={19}
                                                    maxLength={19}
                                                    onChange={(e) => {
                                                        setPhoneNumber(e.target.value);
                                                        setPhoneNumberValid(e.target.value.trim() !== '');
                                                    }}
                                                />
                                            </div>
                                            <div className="col-4 col-md-6">
                                                <label className="pay">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    className="placeicon"
                                                    onChange={(e) => {
                                                        setEmail(e.target.value)
                                                        setEmailValid(e.target.value.trim() !== '')
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label className="pay">Address</label>
                                            </div>
                                            <div className="col-md-12">
                                                <input
                                                    type="text"
                                                    name="exp"
                                                    id="exp"
                                                    placeholder="address"


                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                {
                                                    load && <Loading />
                                                }
                                                <button className={`${load && ' active'} btn_submit`} style={{ backgroundColor: "black", width: "200px", height: "50px", color: "white", fontSize: "25px" }} onClick={() => {
                                                    handleOrder();

                                                }}>
                                                    Order
                                                    <div className='btn_loading'>
                                                        <Spin indicator={antIcon} />
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

