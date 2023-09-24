import axios from "axios";

export default {
    findMany: async function () {
        return await axios.get(import.meta.env.VITE_SV_HOST + "categories")
    },
    findByCategory: async (id: string) => {
        return await axios.get(
            `${import.meta.env.VITE_SV_HOST}/categories/` + id,
        );
    },
    findProductByCategory: async (categoryId: string) => {
        return await axios.get(
            `${import.meta.env.VITE_SV_HOST}/categories/${categoryId}`
        );
    },
}