import './cart.scss'
import { useEffect, useState } from 'react'
import api from '@services/api'
import { Modal } from "antd";
import { useNavigate } from 'react-router-dom';
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

export default function Cart() {
    const navigate = useNavigate()
    const [cart, setCart] = useState<CartItemDetail[]>([]);
    console.log("cart:", cart)
    useEffect(() => {
        async function formatCart() {
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
        }

        formatCart();
    }, []);
    const deleteCart = (productId: string) => {
        if (localStorage.getItem("carts")) {
            const updatedCarts = cart.filter((item) => item.productId !== productId);
            setCart(updatedCarts);

            localStorage.setItem("carts", JSON.stringify(updatedCarts));
        }
    };

    const calculateTotal = () => {
        let total = 0;
        for (const item of cart) {
            total += item.quantity * item.productDetail.price;
        }
        return total;
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
        const updatedCart = cart.map((item) => {
            if (item.productId === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem("carts", JSON.stringify(updatedCart));
    };

    return (

        <section className="h-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100 py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-10">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                            <div>
                                <p style={{ display: "flex" }} className="mb-0">
                                    <span className="text-muted">Item:</span>
                                    <p style={{ marginLeft: "5px" }} >
                                        {cart.length}
                                    </p>
                                </p>
                            </div>
                        </div>
                        {cart.map(item => (
                            <div key={item.productId} className="card rounded-3 mb-4">

                                <div className="card-body p-4">
                                    <div key={item.productId} className="row d-flex justify-content-between align-items-center">
                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                            <img
                                                src={item.productDetail.avatar}
                                                className="img-fluid rounded-3"
                                                alt="Cotton T-shirt"
                                            />
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                            <p className="lead fw-normal mb-2">{item.productDetail.name}</p>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                            <button
                                                className="btn btn-link px-2"
                                                onClick={() => {
                                                    if (item.quantity > 1) {
                                                        updateQuantity(item.productId, item.quantity - 1);

                                                    } else if (item.quantity == 1) {
                                                        Modal.warning({
                                                            content: "Do you want to delete this product?",
                                                            onOk: () => {
                                                                deleteCart(item.productId)
                                                            },
                                                        });
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-minus" />
                                            </button>

                                            <p style={{ marginTop: "7px" }}>{item.quantity}</p>

                                            <button
                                                className="btn btn-link px-2"
                                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                            >
                                                <i className="fas fa-plus" />
                                            </button>
                                        </div>
                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                            <h5 className="mb-0">${item.productDetail.price}</h5>
                                        </div>
                                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                            <a href="#!" className="text-danger">
                                                <i onClick={() => {
                                                    Modal.warning({
                                                        content: "Do you want to delete this product?",
                                                        onOk: () => {
                                                            deleteCart(item.productId)
                                                        },
                                                    });
                                                }} className="fas fa-trash fa-lg" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div style={{ marginTop: "50px" }} className="card">
                            <div className="card-body">
                                <div className="card-body_total">
                                    <h1>Total:</h1>
                                    <p>
                                        ${calculateTotal()}
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
