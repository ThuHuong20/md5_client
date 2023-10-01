import api from '@/services/api';
import { useEffect, useState } from 'react';

import { Modal, message } from 'antd';
import { useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { useNavigate } from 'react-router-dom';



export default function UserManager() {
    const navigate = useNavigate()

    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })

    useEffect(() => {
        console.log("userStore", userStore);

    }, [userStore])



    return (
        <div>
            <h1 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "10px" }}>Guest Manager</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div className="tableContent">STT</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">CustomerId</div>
                        </th>

                        <th scope="col">
                            <div className="tableContent">Status</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">Create At</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">Details</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {userStore.receipts?.map((receipt: any, index: number) => (
                        <tr key={Date.now() * Math.random()}>
                            <th scope="col">
                                <div className="tableContent">{index + 1}</div>
                            </th>
                            <td scope="col">
                                <div className="tableContent">
                                    {receipt.userId}
                                </div>
                            </td>

                            <td scope="col">
                                <td className="tableContent">
                                    <select >
                                        <option value="PENDING">Pending</option>
                                        <option value="ACCEPTED">Accepted</option>
                                        <option value="SHIPPING">Shipping</option>
                                        <option value="DONE">Done</option>
                                    </select> </td>
                            </td>
                            <td scope="col">
                                <div className="tableContent" >
                                    {receipt.createAt}
                                </div>
                            </td>

                            <td scope="col">
                                <div style={{ cursor: "pointer" }} onClick={() => {
                                    navigate(`/admin/receiptDetails/${receipt.id}`)
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
