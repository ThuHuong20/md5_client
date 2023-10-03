import { useEffect, useState } from 'react'
import api from '@services/api';
import { Spin, Modal } from 'antd';
import Loading from '../components/Loading';
import { LoadingOutlined } from '@ant-design/icons';
import './cart.scss'
import { Receipt } from '@/stores/slices/user';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function CheckOrder() {
    const [load, setLoad] = useState(false);
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );
    const navigate = useNavigate()
    const [otpInput, setOtpInput] = useState("");
    const [email, setEmail] = useState('')
    const [receipts, setReceipts] = useState<Receipt[] | null>(null)
    useEffect(() => {
        console.log("receipts", receipts)
    }, [receipts])


    function handleGetOtp() {
        if (email != '') {
            /* send otp */
            console.log("đã vào!")
            axios.get(`http://127.0.0.1:3000/api/v1/guest/?email=${email}`)
                .then(res => {
                    let otp = window.prompt("OTP của bạn là (check your email)?");
                    if (otp != '') {
                        axios.get(`http://127.0.0.1:3000/api/v1/guest/?email=${email}&otp=${otp}`)
                            .then(res => {
                                console.log("res", res)
                                setReceipts(res.data.data)
                            })
                            .catch(err => {
                                alert("Lỗi!")
                            })
                    }

                })
        }
    }

    return (
        <div className='check_order'>
            <div className='check_order_email'>
                <h1 className='check_order_h1'>Check Order</h1>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className='check_order_input'>
                        <input placeholder='Email' type="text" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                        {
                            load && <Loading />
                        }
                        <button className={`${load && ' active'} check_order_button btn_submit`} onClick={() => {
                            handleGetOtp()
                        }}>
                            Get OTP
                            <div className='btn_loading'>
                                <Spin indicator={antIcon} />
                            </div>
                        </button>
                    </div>
                    {/* <div className='check_order_otp'>
                        <input placeholder='OTP' type="text" value={otpInput} onChange={(e) => {
                            setOtpInput(e.target.value)
                        }} />
                        <button className='check_order_button2 btn_submit' onClick={() => {
                            handleGetReceipt()
                        }}>Get Bill</button>
                    </div> */}
                </div>

            </div>
            <div className='history'>
                {/* Noi hien thi history */}
                <h1>Bill</h1>
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
                        {receipts?.map((receipt: any, index: number) => (
                            <tr key={Date.now() * Math.random()}>
                                <th scope="col">
                                    <div className="tableContent">{index + 1}</div>
                                </th>
                                <td scope="col">
                                    <div className="tableContent"> {receipt.id}</div>
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
                                            onClick={() => {
                                                navigate(`/guestReceiptDetail/${receipt.id}`)
                                            }}
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
        </div>
    )
}