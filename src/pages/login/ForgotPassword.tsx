import api from '@/services/api';
import './login.scss'
import { FormEvent, useState } from 'react';
import { message } from 'antd'
export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    async function resetPassword(event: FormEvent) {
        event.preventDefault();
        await api.userApi.resetPassword({
            email: email
        })
            .then(res => {
                console.log("res", res);
                message.success("Check your confirmation email")
            })
            .catch(err => {
                console.log("err", err);

            })

    }
    return (
        <div>
            <>
                {/* Button trigger modal */}
                <button
                    type="button"
                    //className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                >
                    Forgot Password
                </button>
                {/* Modal */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Get password
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input className='inputEmail' type="text" placeholder='Enter Email' name='email' onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                            </div>
                            <div className="modal-footer">
                                <button
                                    aria-hidden="false"
                                    onClick={(e) => {
                                        resetPassword(e)
                                    }}
                                    style={{ color: "white", marginLeft: "380px", backgroundColor: "black", marginTop: "10px" }} type="button" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </div>
    )
}
