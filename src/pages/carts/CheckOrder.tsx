import { useState } from 'react'
import api from '@services/api';
import { Spin, Modal } from 'antd';
import Loading from '../components/Loading';
import { LoadingOutlined } from '@ant-design/icons';
import './cart.scss'
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
    const [emailInput, setEmailInput] = useState("");
    const [otpInput, setOtpInput] = useState("");
    const [receipts, setReceipts] = useState([])
    console.log(" receipts:", receipts)
    function handleGetOtp() {
        setLoad(true)
        api.purchaseApi.findGuestReceipt({ email: emailInput })
            .then(res => {
                if (res.status == 200) {
                    setLoad(false)
                    //alert(res.data.message)
                    Modal.success({
                        content: res.data.message,
                    });

                }
                // setLoad(true);

            })
            .catch(err => {
                setLoad(false)
                console.log("lỗi", err)
            })
        // setLoad(false);

    }
    function handleGetReceipt() {
        api.purchaseApi.findGuestReceipt({ email: emailInput, otp: otpInput ?? "2000" })
            .then(res => {
                if (res.status == 200) {
                    setReceipts(res.data.data)
                }
            })
    }
    return (
        <div className='check_order'>
            <div className='check_order_email'>
                <h1 className='check_order_h1'>Check Order</h1>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className='check_order_input'>
                        <input placeholder='Email' type="text" value={emailInput} onChange={(e) => {
                            setEmailInput(e.target.value)
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
                    <div className='check_order_otp'>
                        <input placeholder='OTP' type="text" value={otpInput} onChange={(e) => {
                            setOtpInput(e.target.value)
                        }} />
                        <button className='check_order_button2 btn_submit' onClick={() => {
                            handleGetReceipt()
                        }}>Get Bill</button>
                    </div>
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
        </div>
    )
}