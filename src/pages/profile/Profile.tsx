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
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEUNmMf////89/cAksT//PkAlMVlsNIAk8UAkMP/+vn//foAmMe82ury9/vV6fL59/dAps7e7vV2u9kknsrl8vefzuPM5fCMw93t8fSu1OZsttaFwdxOrNG22elZsNOBv9um0OTD3Ok5osyWyN/s9/rP5/Lc6PDyJQoZAAAMrElEQVR4nNWd6ZqyOBCFoWOa0LQ2LW4g7n59/5c4CW4oYJY6Ueb8mB8zz2DerixVSaUShN41HO3yw3L8WaZZFihl+7QsNsvpavY79P/zgc+Pj1bz9T5ggkWcB0ES1MU5jxhjQVocdr8+G+GL8DcfZ0JIsHuuFnHOhEiX3xNPLfFB+DtdJ9JsWrY7TiayIj96aA2acLgqEsFt2OrWFNnyH7hBWMJhXkbMEe+khIug+Ea2CUgo8UREobuakvFiBmsWjHA25gyBd4YU2Rw180AIh9uM1jlbIcsdom0IwsmYR1bzpqlEMqW3jk44WrtOnQaK2JK8gBAJR6VHPiXOxsQBSSKUfF7xToxiQ7IjgXCyBs6eTxnZ/B2Ew43n/nnHyLcvJ9xGr+NTYpmrE+BGOMpe1EFvSsSnWzDpRDgWXtY/jRy7qgPhLnhtB71JpA4rhz1h8YIVopvR3oy2hKPsXQY8I5a2o9GScP6WEVgX5zuPhMP05VNoi8TSG+G/t00x92KpTU+1IJy+c4q5Ew9GPgiLPvTQi0SOJ0whezAwmQ9GQ8JJ0o8heBNbQwlH7+ZpEU+BhLPezDF18cwoMjYh/O7THFNXYuKmGhDmvbRgJW5waqUn7DFgkAR6RC1hnwHVOYcWUUe46jWgsqJuLGoIdz0HlEo0M+pzwllfZ9G6sud++FPCyf8BMOB7Z8Jjgg53k9o/ceJPHbhnhHtoMyIhkn1ZrtflPmMCehrHNm6En7BGcJaU893fRxwPKsXxZHcogGeOzzaougnnoEGoznNnP5Lqoy4F+zdNUScDontHvJMQtBDyqBhJo320Kh4s5gkm7ow614wuwgko6WCz6MI7afCzxTB2xlJdhBniV1mh4Tv11wOiq0ZjO8Ix4Ed5shvo8E52/EPsUoqONJx2QsQgZOsfrf0u+joAfrBjKLYSDgEjQ8z1HbRmxh0gnaN9KLYSlgDA/Mucr+qpdFeHHUwJt/QuI1ZmQ/CmGIAo2oLFFsIjAHBrC6gQ6bNbZkZI76N8aQ8oO+o3+U/LWpKomoQr8szNSxdAOaPOyVZkzYi/QTik9xW+cAKUHTUl/3apJ6Sv9WxlsUzcE07I/bS57j8S/tKnmdStjyoN6P20YbLHf0HvJ2LkakKpH/KKwR8XxQdC+nQWrN1NKI04JbtTbPiUMKOvuhQTSiOSuykfPyPc0n381M5baxhxSUYUkyeEdO+XO0+kZ/2Rxwn/7CacAqLCHxrgxyCle+C/nYSAjcyCMs8oASL+eyPWCbd0E0Y5sZPKbkqfC+5GYp0QYEKxIBMOAG5j0U5Id7ll+EKbSSvCT3oz6g54jXAPmEnH1GEIGYgBn7cRIhIu+JTcST/iHaAv8TbCNf27AdvRCQEroiTMm4T0wEVK/NEBP34ADUn2TUJA3CL/dNT1XilG7LezUYMQcmyZIQgBXk3d/74QQhK7kgwwDD8GiBnhNtdcCNeITpoQwvsaYQFoSsDyB0LMSaXjJtsjIaQx5T0hwp8J+kXIj3eEAE9JqVeE+R0hKPUJNA5BQ6ZOCOqkyR5CCJlLpfsxrBGC/moBZrWg72hWYqsaISpLKYGs+IAgR+kcJVaEI1T+GsRro+8KX3QjhCRDKIkJghDWmtGVENTxexQ9VTpt8AfAtQKyEYWJgE8qL4S4T/I5YBcDsOV3lrgQQkLDkwBOzQCRrXSS+HcmhA1DuVzQ99q+6KdDF/HpmRCYs8vo+6UxLvW62vwOIMe+V9En0xiw531VdiJcAROS6VNNvAVedFSnpZKQfmJXEzm6QEUWldisIgS58idFVL8NstN2bc22IgR+ETAQYR6NktpxC8Ih9OIPdSAC13ulVBGOoIQJ8fRpAMj8rEkoQlB8f/0mbWP/B9yaoSSEhU4n0Y6fgG53JRlABeEGfA+dtF5A14pATXySENvx5QztmpmoBIt+L42ZSkLQrshVlG4ao6+N87kkxH5SbSm6z6aojcSreBEGgIzZBxFm0wX8SmcqCeE3fd2yvJWgXnelZB8GHm7CJq4mRO2U1pSFwT88Ift2nGugPulJSRiAl9hKjhmYwB2aq/gw8FHWw3GuQS+GSkwSevisW2pUTM+Abkr4IXTbkBogY9+LfBG6RIlwf6aSL0KXVGHUseG9vBFG1s5pjI3EL/Jnw8SWEO6SnuSPMNraIcYeVnslf4S2rtuXHxNWhJ4qtNgZ0ZcJ1Yrvw2urZJW14GkUVl6btzJC0cF8TfQ0kSp5iZ7O4uYVB8C7pDVlPiLgi7ixEf2ZUEXAiPoJHTI+pUHvIdaUhgHyBPhB3DAzI8Zvz1y19rCbWJNh3kKce+tH1W6iF4f3LLNu6iO2P4sfJKG/z5vG+gNc9sWj2Df+ZObu+4bHpd4acDqZQSYqPMhw0w1xSaZD4gg/Ib3/vtm9bi/bF+cWqBNSQLGWLhkWyPDmlFbXn4Iw9LfkG68WvtZDlSYcQGomtUsY52X4mktVYluAqVzW+nnjRMXYV6VbuVigs77qSixii7GffipOWV+/Xr7OE5td4YGft13OmXvwU2AlVppbsEI8+Hj9ZI3PoD2L86lNPboK0cMbUlUquyKEJieqD4vxwmFXP94mdu/PaqVSEytC7HZbxHUVPTsZP3LsW5jXTHbcRkbCRbr9cU8ZigezgsE8kNOF7uq+BSgIjlh6mLiZr8b4s1pzjCVPlRUqQsBA5CL4zCdfiLtrEnK3yQT9cb5TceEAcJFb0pWHWUy03j3k4DcvAkakrN3Oc/4QjwRfT5ulniGU8V9eKFu6jqF1jdApfOERy8bbv9gD3Y1ysPje7N3GZZTXCO03u9TT0vmks441EFJRqnFpDSmONULb9YJHxQ457gwo/+a2DzKld3e5rWJEHs0d13SKBnFu5ddF0zvC3Pzvk7DNz+v5lOLB1uJtu0slpTPh0fivw5MR4kq6mwaL0rihl8rQ18ofpoCpXVQEVvxl+qBBtH0gNLyTwNP3dNCbTBHF8IHQbNFPsrda8IRodBR3q7t3JTS6lEAs3YlRbOLjiF2D0OSeJaIcG10mCXDJrbL3rZqZwZJIukqBk0GydDRtIdQX2OXkwpYYGZyoimELoX7Ljbvmb6Olvf5Vr7RbI9Te/CPfD0VJe1hVr9Far+6psyGb9cOG+qrf9Seu6oT62grvXw2lYu2WhBh1EGpTa/iaXjKBDqivX3NXXP+ujrDWiGL6/tl0UGpbOeok1OdHibcPxa+ldr2/fx/hvp73QYvI6YUvSDJ45uPehI9V53X/dxDs3xs9jfQ2eHgr8IFQX3be9QESDOBC/9zOQ9H5xusP+vSk6I2+20Kfl8If30J8JDTY/mabN60Z8UeqD/H446ukjSc9DAqZivlbEI0AWeOtxwahSVa0OLwBMY61C6FU89XV5mtIBxNEQE0vaxlYsO3VrpYXrUxyIcXyxVaMf0wAG9NMO6FR3ShWvHTTLV5kRltlTZrWl+WWJuc00fqVgH9GJ2yt7622vg5o9BAwz17mwBm+jhi1PgvcSmhY3+xV+/tfU6P2JG0v53W90mn2SadHAK0Vx4YZYa2vH3a+tGqy9ARqvjm/0uxPXxOzOUbGru0oXa/lGn1UDcZP3zI8nu58fryL0GP2txclnY9Td/6Hqb+bOj7UMQifEYaFv/xvvM6Vre0IQxM3qSdiy26MJ4RD+vO1L1LnLKMhDH//J/2UN0MmQ8LQ2x1hrJLHsN6cEPICuXfx5gu55oSm7ts7xTrXCSNCo4j/raoqWlMIw3m/rdgaEtoRhss+I95SLgiEfbai3oJGhOGhr4hMNwZNCcNtPxG5Zha1IEQ89QwXT56vg3aE4b/eeeF8/9STsSYMJ7Y5yJ7FnjnbToQymOqTH87m+gZbE4bj3gzGRHQHvBTCcMX6ETDyzGgSdSAMf3sxGIXxELQnDEM/13VtlHTti4II3x4xRlY91IUwPKbvZBSthy9YwndGxTww8LQBhOGxfA+jgwEdCVUZhtdPqmxvOwIphGG4ebEZOW+kkXgmDH/LF67/XGwM/WwgYRju9q+yo1ibBUpoQjkc8YUe2vjKkb4pngjDMM9891VROqwQQEJpR599lYs1yX4QwjCclfa3kE2URGLstkCgCeW8usGvj1xkU+f5sy4IodQ2hRoyEgVx+F2FIpSGnDvcmW/HY2kOMV8lHKHUaBkIahGdSKRTwurXFJRQanTYR861V7gI1vkR3CI0odTxe5wJa0ouWDpHjb26PBAqHb/nacCMMBPOmcjWUx90Sp4IK01W889MSHNKNfI6EhkuREyIaF9Mv3HzSlM+CU+a/FsdNkW6zxSTkMASOQmyfVnMp98j9Khryj/hTcObXvir/wGB9+jgA1Hf+gAAAABJRU5ErkJggg=="
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
                            value={(userStore! as User)?.userName}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Email"
                            value={(userStore! as User)?.email}
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
                                Email authentication: {(userStore! as User)?.emailAuthentication ? "Authenticated" : "Not authenticated"}
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
