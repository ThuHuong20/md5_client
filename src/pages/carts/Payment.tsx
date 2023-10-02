import './cart.scss'
import { useEffect, useState } from 'react'
import api from '@services/api'
import { Spin, Modal, message } from 'antd';
import Loading from '../components/Loading';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
    const navigate = useNavigate()
    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })

    useEffect(() => {
        console.log("userStore.cart?.total", userStore.cart?.total);

    }, [userStore.cart?.total])
    const calculateTotal = () => {
        let total = 0;
        userStore.cart?.detail.forEach((item) => {
            total += item.quantity * item.option.price;
        });
        return total;
    };

    function handleCheckOut(e: React.FormEvent) {
        e.preventDefault();
        let payMode = (e.target as any).payMode.value;
        userStore.socket?.emit("payCash", {
            receiptId: userStore.cart?.id,
            userId: userStore.data?.id,
        })
        message.success("Payment has been successful")
        navigate('/')
    }
    // Validation states
    const [nameValid, setNameValid] = useState(false);
    const [phoneNumberValid, setPhoneNumberValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    return (
        <>
            <div id="wrapper">
                <div className="container1">
                    <div className="order">
                        <h2>Your order summary</h2>
                        {userStore.cart?.detail.map(item => (
                            <div className="items">
                                <img style={{ width: "100px", height: "100px" }}
                                    src={item.option.product.avatar}
                                    alt=""
                                />
                                <div className="info">
                                    <h4>{item.option.product.name}</h4>
                                    <p className="quantity">{item.option.option}</p>
                                    <p className="quantity">Quantity: {item.quantity}</p>
                                    <p className="price">${item.option.price}</p>
                                </div>
                            </div>
                        ))}
                        <h4 className="ship">Shipping: FREE</h4>
                        <hr />
                        <h3 className="total">TOTAL: ${calculateTotal()}</h3>
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
                                                name="exp"
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
                                                name="exp"
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
                                                name="exp"
                                                id="exp"
                                                placeholder="SDT"
                                                onChange={(e) => {
                                                    setPhoneNumber(e.target.value);
                                                    setPhoneNumberValid(e.target.value.trim() !== '');
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input className='inputs'
                                                type="text"
                                                name="exp"
                                                id="exp"
                                                placeholder="address"
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

