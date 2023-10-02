import axios from "axios";

export default {
    create: async function (formData: FormData) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "product", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },

    createOption: async function (productOption: any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "product-option", productOption)
    },
    findProductById: async (id: string) => {
        return await axios.get(
            `${import.meta.env.VITE_SV_HOST}product/${id}`,
        );
    },
    // findMany: async function (maxItemPage: number, skipItem: number) {
    //     return await axios.get(`${import.meta.env.VITE_SV_HOST}/products?maxItemPage=${maxItemPage}&skipItem=${skipItem}`);
    // },

    findMany: async function (take: number, skip: number) {
        return await axios.get(`${import.meta.env.VITE_SV_HOST}product?take=${take}&skip=${skip}`);
    },
    findProductByCategory: async (id: string) => {
        return await axios.get(
            `${import.meta.env.VITE_SV_HOST}categories/` + id
        );
    },
    search: async function (searchString: string) {
        return await axios.get(`${import.meta.env.VITE_SV_HOST}product/search?q=${searchString}`)
    },

    update: async function (productId: any, formData: FormData) {
        return await axios.patch(
            `${import.meta.env.VITE_SV_HOST}product/${productId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );
    },
}