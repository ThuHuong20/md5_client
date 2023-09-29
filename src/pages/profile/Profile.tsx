import { useEffect, useState } from 'react';
import './profile.scss'
import api from '@/services/api';
import { message } from 'antd'
import { useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { User } from '@/stores/slices/user';
import axios from 'axios';

export default function Profile() {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })


    async function handleChangePassword() {
        let data = {
            oldPassword,
            newPassword
        }
        await api.userApi.changePassword(data)
            .then(res => {
                if (res.status == 200) {
                    message.success("Check your confirmation email")
                    localStorage.removeItem("token")
                    window.location.href = '/';
                } else {
                    message.error('Incorrect password')
                }
            })
            .catch(err => {
                console.log("err", err);

            })
    }

    // async function handleResendEmail() {
    //     try {
    //         const res = await api.userApi.resendEmail();
    //         message.success("Email confirmation sent successfully. Check your email.");

    //     } catch (err) {
    //         console.error("Error:", err);
    //     }
    // }
    function handleResendEmail() {
        axios.get("http://127.0.0.1:3000/api/v1/users/resend-email", {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
    }

    return (
        <>
            <div className="profile">
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                    className="profile_title"
                >
                    <div>
                        {/* <i className="fa-solid fa-user-pen"></i> */}
                        <h4>PROFILE</h4>
                    </div>
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            window.open("/receipts");
                        }}
                    >
                        <h4>PURCHASE HISTORY</h4>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
                    <div>
                        <img
                            style={{
                                width: "150px",
                                height: "150px",
                                borderRadius: "50%",
                                marginTop: "10px",
                            }}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ86yDtDbrPbacDIiDqqw1XzpPklqLKqcVM5g&usqp=CAU"
                            alt=""
                        />
                        <br />

                        <b style={{ marginLeft: "50px" }}>

                            Avatar
                        </b>
                    </div>
                    <div style={{ width: "400px", marginTop: "30px" }}>
                        <input
                            type="text"
                            placeholder="User Name"
                            value={(userStore.data! as User)?.userName}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Email"
                            value={(userStore.data! as User)?.email}
                        />
                    </div>
                </div>
                <br></br>
                <form
                    onSubmit={() => {
                        handleChangePassword()
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <div style={{ marginTop: "10px" }}>
                            <b>Password Change</b>
                            <input value={oldPassword} type="password" placeholder="OldPass"
                                onChange={(e) => {
                                    setOldPassword(e.target.value)
                                }} />
                            <br />
                            <input value={newPassword} type="password" placeholder="NewPass"
                                onChange={(e) => {
                                    setNewPassword(e.target.value)
                                }} />
                            <br />
                            <input
                                name="renew_pass"
                                type="password"
                                placeholder="ReNewPass"
                            />
                            <br />
                            <div className="button_text">
                                <button
                                    style={{ width: "100%", backgroundColor: "rgb(23, 162, 184)", marginTop: "7px" }}
                                    type="submit"
                                    className="btn btn-info"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                        <div>
                            <b style={{ marginLeft: "50px" }}> Confirm email</b>

                            <div
                                style={{
                                    border: "1px solid black",
                                    width: "90%",
                                    height: "220px",
                                    marginLeft: "50px",
                                    borderRadius: "5px",
                                    textAlign: "center",
                                    padding: "58px",
                                }}

                            >
                                Email authentication: {(userStore.data! as User)?.emailAuthentication ? "Authenticated" : "Not authenticated"}
                                <p>
                                    Send email to verify account
                                </p>

                                <button style={{ marginTop: "10px" }}
                                    className="btn btn-info"
                                    onClick={() => {
                                        handleResendEmail()
                                    }}
                                >
                                    Resend Email
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
