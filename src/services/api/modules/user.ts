import axios from "axios";

export default {
    register: async (newUser: any) => {
        return await axios.post(import.meta.env.VITE_SV_HOST + "users", newUser)
            .then(res => res)
            .catch(err => err)
    },
    login: async function (data: any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "users/login", data)
    },
    authen: async function (data: any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "authen/login", data)
    },

    // authentication: async function () {
    //     return await axios.get(import.meta.env.VITE_SV_HOST + "auth")
    // },
    resetPassword: async function (email: any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "users/reset-password", email)
    },
    changePassword: async function (data: any) {

        return await axios.post(import.meta.env.VITE_SV_HOST + "users/change-password", data, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
    },
    resendEmail: async function () {
        return await axios.get(import.meta.env.VITE_SV_HOST + "resend-email"), {
            headers: {
                "token": localStorage.getItem("token")
            }
        }

    }
}