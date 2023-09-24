import api from "@/services/api";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Receipt {
    product: {
        avatar: string;
        name: string;
        price: number;
    };
    quantity: number;
}


export default function GuestDetails() {
    const { orderId } = useParams();
    const [receipts, setReceipts] = useState<Receipt[]>([]);
    const [total, setTotal] = useState<number | undefined>(0);
    console.log(" receipts:", receipts)
    useEffect(() => {
        if (orderId) {
            api.purchaseApi
                .findById(orderId)
                .then((res) => {
                    if (res.status == 200) {
                        console.log("res.data 123", res.data.data)
                        setReceipts(res.data.data.guestReceiptDetail);

                        // Calculate the total using the separate function
                        const calculatedTotal = calculateTotal(res.data.data.guestReceiptDetail);
                        setTotal(calculatedTotal);
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch((err) => {
                    alert("sap server");
                });
        }

    }, []);
    const calculateTotal = (receipts: Receipt[]) => {
        return receipts.reduce((acc, receipt) => {
            return acc + (receipt.product.price * receipt.quantity);
        }, 0);
    };

    return (
        <div>
            <h1 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "10px" }}>Guest Receipt Detail</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div className="tableContent">#</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">Avatar</div>
                        </th>

                        <th scope="col">
                            <div className="tableContent">Name</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">Price</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">Quantity</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {receipts.slice().reverse().map((receipts: any, index: any) => (
                        <tr key={Date.now() * Math.random()}>
                            <th scope="col">
                                <div className="tableContent">{index + 1}</div>
                            </th>
                            <td scope="col">
                                <div className="tableContent">
                                    <img style={{ width: "150px", height: "140px" }} src={receipts.product.avatar} alt="" />
                                </div>
                            </td>

                            <td scope="col">
                                <div className="tableContent"> {receipts.product.name}</div>
                            </td>
                            <td scope="col">
                                <div className="tableContent">
                                    ${receipts.product.price}
                                </div>
                            </td>

                            <td scope="col">
                                <div className="tableContent">
                                    {receipts.quantity}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <div style={{ display: "flex", marginTop: "20px" }}>
                    <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>Total: </h1>
                    <p style={{ fontSize: "20px", fontWeight: "bold", color: "red", marginTop: "7px", marginLeft: "10px" }}>${total}</p>
                </div>

            </table>
        </div>
    )
}
