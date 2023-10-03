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
        return await axios.get(import.meta.env.VITE_SV_HOST + "users/resend-email"), {
            headers: {
                "token": localStorage.getItem("token")
            }
        }
    },
    receiptFindAll: async function () {
        return await axios.get(import.meta.env.VITE_SV_HOST + "receipt")
    },
    findReceiptById: async (receiptId: string) => {
        return await axios.get(
            `${import.meta.env.VITE_SV_HOST}receipt/${receiptId}`,
        );
    },
    googleLogin: async (data: any) => {
        return await axios.post(
            import.meta.env.VITE_SV_HOST + "users/google-login",
            data,
        )
    },
    updateAvatar: async function (formData: FormData) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "users/updateAvatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
}