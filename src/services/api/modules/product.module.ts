import axios from "axios";

export default {
    create: async function (formData: FormData) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "products", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    findProductById: async (id: string) => {
        return await axios.get(
            `${import.meta.env.VITE_SV_HOST}/products/${id}`,
        );
    },
    findMany: async function (maxItemPage: number, skipItem: number) {
        return await axios.get(`${import.meta.env.VITE_SV_HOST}/products?maxItemPage=${maxItemPage}&skipItem=${skipItem}`);
    },
    findProductByCategory: async (id: string) => {
        return await axios.get(
            `${import.meta.env.VITE_SV_HOST}/categories/` + id
        );
    },
    search: async function (searchString: string) {
        return await axios.get(`${import.meta.env.VITE_SV_HOST}/products?search=${searchString}`)
    },
    update: async function (productId: any, formData: FormData) {
        return await axios.patch(
            `${import.meta.env.VITE_SV_HOST}/products/${productId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );
    },
}