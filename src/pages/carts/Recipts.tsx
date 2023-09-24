import { useEffect, useState } from 'react'
import api from '@/services/api';
export default function Recipts() {
    const [receipts, setReceipts] = useState([])
    console.log(" receipts:", receipts)
    useEffect(() => {
        api.purchaseApi
            .findUserReceipt()
            .then((res) => {
                if (res.status == 200) {
                    console.log("res.data 123", res.data)
                    setReceipts(res.data.data);
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                alert("sap server");
            });
    }, []);
    return (
        <>
            <div className="informationLine_receipts">
                <div className="informationLine_h2">
                    <h2>Purchase History</h2>
                </div>
                <div>
                    {/* Noi hien thi history */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <div className="tableContent">#</div>
                                </th>
                                <th scope="col">
                                    <div className="tableContent">Receipt Id</div>
                                </th>
                                <th scope="col">
                                    <div className="tableContent">Quantity</div>
                                </th>
                                <th scope="col">
                                    <div className="tableContent">Total</div>
                                </th>
                                <th scope="col">
                                    <div className="tableContent">Paid Status</div>
                                </th>
                                <th scope="col">
                                    <div className="tableContent">Paid Mode</div>
                                </th>
                                <th scope="col">
                                    <div className="tableContent">Create Time</div>
                                </th>

                                <th scope="col">
                                    <div className="tableContent">Detail</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {receipts.map((receipt: any, index: number) => (
                                <tr key={Date.now() * Math.random()}>
                                    <th scope="col">
                                        <div className="tableContent">{index + 1}</div>
                                    </th>
                                    <td scope="col">
                                        <div className="tableContent"> {receipt.id}</div>
                                    </td>
                                    <td scope="col">
                                        <div className="tableContent"> {receipt.guestReceiptDetail.length}</div>
                                    </td>
                                    <td scope="col">
                                        <div className="tableContent" style={{ color: "red" }}>
                                            ${receipt.total}
                                        </div>
                                    </td>
                                    <td scope="col">
                                        <div className="tableContent">
                                            {receipt.paid ? "Paid" : "Un paid"}
                                        </div>
                                    </td>
                                    <td scope="col">
                                        <div className="tableContent"> {receipt.payMode}</div>
                                    </td>
                                    <td scope="col">
                                        <div className="tableContent"> {receipt.createAt}</div>
                                    </td>
                                    <td scope="col">
                                        <div className="tableContent">
                                            <button
                                                style={{ backgroundColor: "rgb(10, 88, 202)" }}
                                                type="button"
                                                className="btn btn-primary"
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
                <div className="informationLine_Continue">
                    <button
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </>


    )
}
