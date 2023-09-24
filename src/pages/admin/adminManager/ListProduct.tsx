import { useState, useEffect } from 'react'
import api from '@/services/api';
import './listProduct.scss'
import Update from './Update';


export default function ListProduct() {

    const [maxItemPage, setMaxItemPage] = useState(5);
    const [skipItem, setSkipItem] = useState(0);
    const [maxPage, setMaxPage] = useState<any[]>([]);
    const [products, setProducts] = useState([]);
    const [updateDatas, setUpdateDatas] = useState([])

    useEffect(() => {
        api.productApi.findMany(maxItemPage, skipItem)
            .then(res => {
                if (res.status == 200) {
                    console.log("res.data", res.data)
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    setSkipItem(res.data.data.length)
                    setProducts(res.data.data)
                }
            })
    }, [])

    function changePage(pageItemObj: any) {
        api.productApi.findMany(maxItemPage, pageItemObj.skip)
            .then(res => {
                if (res.status == 200) {
                    console.log("res.data", res.data)
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    setSkipItem(res.data.data.length)
                    setProducts(res.data.data)
                }
            })
    }


    return (
        <div className="form_listProduct">
            <h1>List Product</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div className="tableContent">#</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">Avatar</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">Name</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">Description</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">Price</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">UpDate</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: any, index: number) => (
                        <tr key={Date.now() * Math.random()}>
                            <th scope="col">
                                <div className="tableContent">{index + 1}</div>
                            </th>
                            <td scope="col">
                                <div className="tableContent">
                                    <img
                                        style={{
                                            width: "180px",
                                            height: "100px",
                                            borderRadius: "1%",
                                            padding: "10px"
                                        }}
                                        src={product.avatar}
                                        alt=""
                                    />
                                </div>
                            </td>
                            <td scope="col">
                                <div className="tableContent"> {product.name}</div>
                            </td>
                            <td scope="col">
                                <div className="tableContent"> {product.des}</div>
                            </td>
                            <td scope="col">
                                <div className="tableContent" style={{ color: "red" }}>
                                    ${product.price}
                                </div>
                            </td>
                            <td scope="col">
                                <div className="tableContent">
                                    <button
                                        style={{ backgroundColor: " #3146d2" }}
                                        type="button"
                                        className="btn btn-info"
                                        onClick={() => setUpdateDatas(product)}

                                    >

                                        <Update product={updateDatas} />
                                    </button>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='page_box'>
                {
                    maxPage.map(item => {
                        return (
                            <span style={{ marginRight: "15px", cursor: "pointer" }} onClick={() => {
                                changePage(item)
                            }}>{item.number}</span>
                        )
                    })
                }
            </div>
        </div>
    )
}
