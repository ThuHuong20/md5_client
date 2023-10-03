import './cart.scss'
import { useEffect, useState } from 'react'
import api from '@services/api'
import { Modal, message } from "antd";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { Receipt, ReceiptDetail } from '@/stores/slices/user';
import { CartItemType, guestCartActions } from '@/stores/slices/guestCart.slice';


export default function Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChangeQuantity = (optionId: string, quantity: number) => {
        const cart = userStore.cart?.detail;
        if (cart) {
            if (userStore.socket) {
                userStore.socket.emit("addToCart", {
                    receiptId: userStore.cart?.id,
                    optionId,
                    quantity
                })
            }
        }
    }

    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })

    const guestCartStore = useSelector((store: StoreType) => {
        return store.guestCartStore
    })
    // console.log(" guestCartStore:", guestCartStore)




    // useEffect(() => {
    //     console.log("userStore.cart.detail", userStore.cart?.detail);

    // }, [userStore.cart?.detail])


    const hadleDeleteItemFromCart = (optionId: string) => {
        if (userStore.socket) {
            userStore.socket.emit("deleteItemFromCart", {
                receiptId: userStore.cart?.id,
                optionId,
            })
        }
    }



    return (

        <section className="h-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100 py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-10" style={{ width: "1200px" }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                            <div>
                                <p style={{ display: "flex" }} className="mb-0">
                                    <span className="text-muted">Item:</span>
                                    <p style={{ marginLeft: "5px" }} >
                                        {userStore.cart?.detail.length}
                                    </p>
                                </p>
                            </div>
                        </div>

                        <div className="card rounded-3 mb-4">
                            {userStore.socket ? userStore.cart?.detail.map((item, index) => (
                                <div key={item.id} className="card-body p-4">
                                    <div className="row d-flex justify-content-between align-items-center">
                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                            <img
                                                src={item.option.product.avatar}
                                                className="img-fluid rounded-3"
                                                alt="Cotton T-shirt"
                                            />
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                            <p className="lead fw-normal mb-2">{item.option.product.name}</p>
                                            <p>{item.option.option}</p>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                            <button
                                                className="btn btn-link px-2"
                                                onClick={(e) => {
                                                    const quantityElement = e.currentTarget.parentNode?.querySelector(".quantity-number");
                                                    if (Number(quantityElement?.innerHTML) > 1) {
                                                        handleChangeQuantity(item.optionId, Number(quantityElement?.innerHTML) - 1)
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-minus" />
                                            </button>

                                            <p className='quantity-number' style={{ marginTop: "7px" }}>{item.quantity}</p>

                                            <button
                                                className="btn btn-link px-2"
                                                onClick={(e) => {
                                                    const quantityElement = e.currentTarget.parentNode?.querySelector(".quantity-number");
                                                    handleChangeQuantity(item.optionId, Number(quantityElement?.innerHTML) + 1)

                                                }}
                                            >
                                                <i className="fas fa-plus" />
                                            </button>
                                        </div>
                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                            <h5 className="mb-0">${item.quantity * item.option.price}</h5>
                                        </div>
                                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                            <a href="#!" className="text-danger">
                                                <i
                                                    onClick={() => {
                                                        Modal.warning({
                                                            content: "Do you want to delete this product?",
                                                            onOk: () => {
                                                                hadleDeleteItemFromCart(item.optionId)
                                                            },
                                                        });
                                                    }}
                                                    className="fas fa-trash fa-lg" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )) : guestCartStore.cart?.map((item, index) => {
                                return (
                                    <div key={Date.now() * Math.random()} className="card-body p-4">
                                        <div className="row d-flex justify-content-between align-items-center">
                                            <div className="col-md-2 col-lg-2 col-xl-2">
                                                <img
                                                    src={item.option.product.avatar}
                                                    className="img-fluid rounded-3"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="col-md-3 col-lg-3 col-xl-3">
                                                <p className="lead fw-normal mb-2">{item.option.product.name}</p>
                                                <p>{item.option.option}</p>

                                            </div>
                                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                <button
                                                    className="btn btn-link px-2"
                                                    onClick={(e) => {
                                                        const quantityElement = e.currentTarget.parentNode?.querySelector(".quantity-number");
                                                        const newQuantity = Number(quantityElement?.innerHTML) - 1;
                                                        if (Number(quantityElement?.innerHTML) > 1) {
                                                            let cart = JSON.parse(localStorage.getItem("cart") ?? "[]")
                                                            let findResult = cart.find((itemResult: any) => itemResult.option.id === item.option.id)
                                                            if (findResult) {
                                                                findResult.quantity = Number(quantityElement?.innerHTML) - 1
                                                                localStorage.setItem("cart", JSON.stringify(cart))
                                                                dispatch(guestCartActions.setCart(cart))
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <i className="fas fa-minus" />
                                                </button>

                                                <p className='quantity-number' style={{ marginTop: "7px" }}>{item.quantity}</p>

                                                <button
                                                    className="btn btn-link px-2"
                                                    onClick={(e) => {
                                                        const quantityElement = e.currentTarget.parentNode?.querySelector(".quantity-number");
                                                        const newQuantity = Number(quantityElement?.innerHTML) + 1;
                                                        let cart = JSON.parse(localStorage.getItem("cart") ?? "[]")
                                                        let findResult = cart.find((itemResult: any) => itemResult.option.id === item.option.id)
                                                        if (findResult) {
                                                            findResult.quantity = Number(quantityElement?.innerHTML) + 1
                                                            localStorage.setItem("cart", JSON.stringify(cart))
                                                            dispatch(guestCartActions.setCart(cart))
                                                        }
                                                    }}
                                                >
                                                    <i className="fas fa-plus" />
                                                </button>
                                            </div>
                                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                <h5 className="mb-0">${item.quantity * item.option.price}</h5>
                                            </div>
                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                <a href="#!" className="text-danger">
                                                    <i
                                                        onClick={() => {
                                                            let cart = JSON.parse(localStorage.getItem("cart") ?? "[]")
                                                            let findResult = cart.find((itemFind: any) => itemFind.option.id === item.option.id)
                                                            if (findResult) {
                                                                cart = cart.filter((itemFind: any) => itemFind.option.id !== item.option.id)

                                                                Modal.warning({
                                                                    content: "Do you want to delete this product?",
                                                                    onOk: () => {
                                                                        localStorage.setItem("cart", JSON.stringify(cart))
                                                                        dispatch(guestCartActions.setCart(cart))
                                                                    },
                                                                });
                                                            }
                                                        }}
                                                        className="fas fa-trash fa-lg" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                        <div style={{ marginTop: "50px" }} className="card">
                            <div className="card-body">
                                <div className="card-body_total">
                                    <h1>Total:</h1>
                                    <p>
                                        ${userStore.socket ? userStore.cart?.detail.reduce((total, item) => {
                                            return total + item.quantity * item.option.price
                                        }, 0) : guestCartStore.cart?.reduce((total, item) => {
                                            return total + item.quantity * item.option.price
                                        }, 0)}
                                    </p>

                                </div>
                                <button
                                    onClick={() => {
                                        navigate('/payment')
                                    }}
                                    type="button" className="btn btn-bgr btn-warning btn-block btn-lg">
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>



    )
}


