import api from "@/services/api";
import { StoreType } from "@/stores";
import { Receipt, ReceiptDetail } from "@/stores/slices/user";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";




export default function GuestReceiptDetail() {

    const { receiptId } = useParams();
    const [receipts, setReceipts] = useState<Receipt[]>([]);

    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })

    const [total, setTotal] = useState<number>(0);


    useEffect(() => {
        const findResult = receipts?.find((item: any) => item.id === receiptId);
        if (findResult) {
            console.log(`Chi tiết hóa đơn có id ${receiptId}:`, findResult);
        } else {
            console.log(`Không tìm thấy hóa đơn với id ${receiptId}`);
        }
    }, [receipts, receiptId]);


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
                    {/* {receiptDetail?.detail?.map((product: ReceiptDetail, index: number) => (
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
                            <td style={{ color: "red" }} scope="col">
                                <div className="tableContent">${product.option.price * product.quantity}</div>
                            </td>
                            <td scope="col">
                                <div className="tableContent">{product.quantity}</div>
                            </td>
                        </tr>
                    ))} */}

                </tbody>
                <div style={{ display: "flex", marginTop: "20px" }}>
                    <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>Total: </h1>
                    <p style={{ fontSize: "25px", fontWeight: "bold", color: "red", marginLeft: "10px" }}>${total}</p>
                </div>

            </table>
        </div>
    )
}
