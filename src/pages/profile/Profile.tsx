import { useEffect, useState } from 'react';
import './profile.scss'
import api from '@/services/api';
import { message } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { User, userAction } from '@/stores/slices/user';
import axios from 'axios';
import { LoadingOutlined } from "@ant-design/icons";

export default function Profile() {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })
    console.log("userStore:", userStore)
    async function handleChangePassword() {
        let data = {
            oldPassword,
            newPassword
        }
        console.log("data", data);

        await api.userApi.changePassword(data)
            .then(res => {
                console.log("res", res);

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
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );
    const [upAvatar, setUpAvatar] = useState([])
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    // const handleClose = () => setShow(false);

    async function updateAvatar() {

        if (upAvatar.length > 0) {
            (document.querySelector('.input_img_preview') as HTMLImageElement).src = URL.createObjectURL(upAvatar[0]);
        }

        try {
            if (upAvatar.length > 0) {
                let formData = new FormData();
                formData.append('avatar', upAvatar[0]);
                setLoading(true);
                let result = await api.userApi.updateAvatar(formData);
                console.log("resule", result)


                setLoading(false);
                if (result.status == 200) {
                    //handleClose()
                    message.success(`Update Avatar Successfull!`)
                    localStorage.setItem("token", result.data.token);
                    dispatch(userAction.setData(result.data.data))


                } else {
                    console.log("errr");
                }
            }

        } catch (err) {
            console.log("err", err)
            setLoading(false);

        }
    }

    async function handleResendEmail() {
        try {
            const res = await api.userApi.resendEmail()

            console.log("res:", res)
            message.success("Email confirmation sent successfully. Check your email.");

        } catch (err) {
            console.error("Error:", err);
        }
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
                            window.open("/receipt");
                        }}
                    >
                        <h4>PURCHASE HISTORY</h4>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
                    <div className='content_left'>
                        <img style={{ width: "150px", height: "150px", borderRadius: "50%", }} className='input_img_preview' src={userStore?.data?.avatar} alt="" />
                        <input style={{ width: "200px" }} type="file" onChange={(e: any) => {
                            console.log("e", e.target.files);
                            setUpAvatar(e.target.files);
                        }} className='input_btn' />
                        <br />
                        {loading ? <button> <span className='loading-spinner changeAva'></span></button> : <button style={{ marginLeft: "20px", backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px" }} className='changeAva' onClick={() => updateAvatar()}>Change Avatar</button>}

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
                    onSubmit={(e) => {
                        e.preventDefault()
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
                                    onClick={(e) => {
                                        e.preventDefault()
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
