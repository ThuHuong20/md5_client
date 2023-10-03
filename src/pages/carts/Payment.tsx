import './cart.scss'
import { useEffect, useState } from 'react'
import api from '@services/api'
import { Spin, Modal, message, QRCode } from 'antd';
import Loading from '../components/Loading';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { guestCartActions } from '@/stores/slices/guestCart.slice';

export default function Payment() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })
    const guestCartStore = useSelector((store: StoreType) => {
        return store.guestCartStore
    })
    console.log("guestCartStore:", guestCartStore)



    function handleCheckOut(e: React.FormEvent) {
        e.preventDefault();

        /* guest */
        let guest = {
            name: (e.target as any).name.value,
            phoneNumber: (e.target as any).phoneNumber.value,
            email: (e.target as any).email.value,
            address: (e.target as any).address.value
        }

        let payMode = (e.target as any).payMode.value;

        if (userStore.socket) {
            if (payMode == "CASH") {
                userStore.socket?.emit("payCash", {
                    receiptId: userStore.cart?.id,
                    userId: userStore.data?.id
                })
            }
            // message.success("Payment has been successful")
            // navigate('/receipt')


            if (payMode == "ZALO") {
                userStore.socket?.emit("payZalo", {
                    receiptId: userStore.cart?.id,
                    userId: userStore.data?.id
                })
            }
        } else {
            console.log("payMode", payMode)
            console.log("guest", guest)

            let carFormat = guestCartStore.cart?.map((item) => {
                return {
                    optionId: item.option.id,
                    quantity: item.quantity
                }
            })

            let body = {
                guest,
                receiptDetails: carFormat,
                payMode,
                total: guestCartStore.cart?.reduce((total, item) => {
                    return total + item.quantity * item.option.price
                }, 0)
            }

            axios.post("http://127.0.0.1:3000/api/v1/guest", body)
                .then((res) => {
                    console.log("res", res);

                    if (res.status == 200) {
                        Modal.success({
                            title: "Payment successful, invoice has been sent to your email",
                            content: "You can click ok to go to the purchase history check page",
                            onOk: () => {
                                dispatch(guestCartActions.setCart([]))
                                localStorage.setItem("cart", "[]")
                                navigate('/CheckOrder')
                            }
                        })
                    } else {
                        alert("Lỗi")
                    }
                })
                .catch(err => {
                    console.log(" err:", err)
                    alert("Lỗi")
                })
        }
    }
    // Validation states

    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    function validate() {
        if (phoneNumber == "" || address == "") {
            message.error("Please enter all the information!");
            return false;
        }
        return true;
    }

    return (
        <>
            <div id="wrapper">
                <div className="container1">
                    <div className="order">
                        <h2>Your order summary</h2>
                        {userStore.socket ? userStore.cart?.detail.map(item => (
                            <div key={Date.now() * Math.random()} className="items">
                                <img style={{ width: "100px", height: "100px" }}
                                    src={item.option.product.avatar}
                                    alt=""
                                />
                                <div className="info">
                                    <h4>{item.option.product.name}</h4>
                                    <p className="quantity">{item.option.option}</p>
                                    <p className="quantity">Quantity: {item.quantity}</p>
                                    <p className="price">${item.option.price * item.quantity}</p>
                                </div>
                            </div>
                        )) : guestCartStore.cart?.map((item, index) => (
                            <div key={Date.now() * Math.random()} className="items">
                                <img style={{ width: "100px", height: "100px" }}
                                    src={item.option.product.avatar}
                                    alt=""
                                />
                                <div className="info">
                                    <h4>{item.option.product.name}</h4>
                                    <p className="quantity">{item.option.option}</p>
                                    <p className="quantity">Quantity: {item.quantity}</p>
                                    <p className="price">${item.option.price * item.quantity}</p>
                                </div>
                            </div>
                        ))}
                        <h4 className="ship">Shipping: FREE</h4>
                        <hr />
                        <h3 style={{ color: "red" }} className="total">TOTAL:  ${userStore.socket ? userStore.cart?.detail.reduce((total, item) => {
                            return total + item.quantity * item.option.price
                        }, 0) : guestCartStore.cart?.reduce((total, item) => {
                            return total + item.quantity * item.option.price
                        }, 0)}</h3>
                        <div className="qr_modal">
                            {
                                userStore.cartPayQr && <QRCode value={userStore.cartPayQr} icon='https://seeklogo.com/images/Z/zalopay-logo-643ADC36A4-seeklogo.com.png' />
                            }
                        </div>
                    </div>
                </div>
                <div className="container2">
                    <div className="checkout">
                        <div className="payment">
                            <div className="content">
                                <form onSubmit={(e) => {
                                    handleCheckOut(e)
                                }} className="infos">
                                    <div className="method">
                                        <h2>Choose a payment method</h2>
                                        <div >
                                            <input type="radio" name='payMode' value={"CASH"} defaultChecked />
                                            <p style={{ color: "black", marginLeft: "10px" }} >Cash</p>
                                            <input type="radio" name='payMode' value={"ZALO"} />
                                            <p style={{ color: "black", marginLeft: "10px", fontWeight: "bold" }}>Zalo</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input className='inputs'
                                                type="text"
                                                name="name"
                                                id="exp"
                                                placeholder="User Name"
                                                value={userStore.data?.userName}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input className='inputs'
                                                type="text"
                                                name="email"
                                                id="exp"
                                                placeholder="Email"
                                                value={userStore.data?.email}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input className='inputs'
                                                type="text"
                                                name="phoneNumber"
                                                id="exp"
                                                placeholder="SDT"
                                                value={phoneNumber}
                                                onChange={(e) => {
                                                    setPhoneNumber(e.target.value);

                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input className='inputs'
                                                type="text"
                                                name="address"
                                                id="exp"
                                                placeholder="address"
                                                value={address}
                                                onChange={(e) => {
                                                    setAddress(e.target.value);

                                                }}
                                            />
                                        </div>
                                    </div>
                                    <button type='submit' className='button'>Checkout</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>




    )
}

