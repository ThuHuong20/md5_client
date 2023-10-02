import api from "@/services/api";
import { StoreType } from "@/stores";
import { ReceiptDetail } from "@/stores/slices/user";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";




export default function UserReceiptDetails() {

    const { receiptId } = useParams();

    const [receiptDetail, setReceiptDetail] = useState([])

    useEffect(() => {
        if (receiptId) {
            api.userApi.findReceiptById(receiptId)
                .then((res) => {
                    console.log(" res:", res.data.data.detail)
                    if (res.status == 200) {
                        setReceiptDetail(res.data.data.detail);
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch((err) => {
                    alert("sap server");
                });
        }
    }, [receiptId])

    const calculateTotal = () => {
        let total = 0;
        receiptDetail.forEach((item: any) => {
            total += item.quantity * item.option.price;
        });
        return total;
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
                            <div className="tableContent">Option</div>
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
                    {receiptDetail?.map((product: ReceiptDetail, index: number) => (
                        <tr key={index}>
                            <th scope="col">
                                <div className="tableContent">{index + 1}</div>
                            </th>
                            <td scope="col">
                                <div className="tableContent">
                                    <img style={{ width: "150px", height: "140px" }} src={product.option.product.avatar} alt="" />
                                </div>
                            </td>
                            <td scope="col">
                                <div className="tableContent"> {product.option.product.name} </div>
                            </td>
                            <td scope="col">
                                <div className="tableContent">{product.option.option}</div>
                            </td>
                            <td scope="col">
                                <div className="tableContent">${product.option.price * product.quantity}</div>
                            </td>
                            <td scope="col">
                                <div className="tableContent">{product.quantity}</div>
                            </td>
                        </tr>
                    ))}

                </tbody>
                <div style={{ display: "flex", marginTop: "20px" }}>
                    <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>Total: </h1>
                    <p style={{ fontSize: "25px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>${calculateTotal()}</p>
                </div>

            </table>
        </div>
    )
}
