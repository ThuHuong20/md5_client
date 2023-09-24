import api from '@/services/api';
import { useEffect, useState } from 'react';
import './UserManager.scss'
import { Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Order {
    id: string,
    email: string,
    phoneNumber: string,
    address: string,
    state: string,
    createAt: Date
}
export default function UserManager() {
    const navigate = useNavigate()
    const state = ["PENDING", "ACCEPTED", "SHIPPING", "DONE"];
    const [orders, setOrders] = useState<Order[]>([]);
    const [receipts, setReceipts] = useState([])
    console.log(" receipts:", receipts)
    useEffect(() => {
        api.purchaseApi
            .findManyGuest()
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
        <div>
            <h1 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "10px" }}>Guest Manager</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div className="tableContent">ID</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">Customer</div>
                        </th>

                        <th scope="col">
                            <div className="tableContent">Status</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">Created</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">Details</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {receipts.slice().reverse().map((receipts: any, index: number) => (
                        <tr key={Date.now() * Math.random()}>
                            <th scope="col">
                                <div className="tableContent">{receipts.id}</div>
                            </th>
                            <td scope="col">
                                <div className="tableContent">
                                    {receipts.email}
                                </div>
                            </td>

                            <td scope="col">
                                <td className="tableContent" onClick={(e) => {
                                    if (receipts.state == "DONE") return
                                    let curStateIndex = state.indexOf((receipts as Order).state);
                                    Modal.confirm({
                                        content: ("You want to next step " + state[curStateIndex + 1]),
                                        onOk: () => {
                                            api.purchaseApi.update((receipts as Order).id, {
                                                state: state[curStateIndex + 1],
                                                type: false
                                            })
                                                .then(res => {
                                                    message.success(res.data.message);
                                                    (e.target as HTMLElement).querySelector('select')!.value = state[curStateIndex + 1];
                                                    setOrders(orders.map(orderMap => {
                                                        if (orderMap.id == receipts.id) {
                                                            orderMap.state = state[curStateIndex + 1];
                                                        }
                                                        return { ...orderMap };
                                                    }))
                                                })
                                                .catch(err => {
                                                    alert("Lỗi rồi!")
                                                })
                                        }
                                    });

                                }}>
                                    <select disabled defaultValue={(receipts as Order).state}>
                                        <option value="PENDING">Pending</option>
                                        <option value="ACCEPTED">Accepted</option>
                                        <option value="SHIPPING">Shipping</option>
                                        <option value="DONE">Done</option>
                                    </select> </td>
                            </td>
                            <td scope="col">
                                <div className="tableContent" >
                                    {(receipts as Order).createAt.toLocaleString()}
                                </div>
                            </td>

                            <td scope="col">
                                <div style={{ cursor: "pointer" }} onClick={() => {
                                    navigate(`/admin/guestDetails/${receipts.id}`)
                                }} className="tableContent">
                                    Details
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
