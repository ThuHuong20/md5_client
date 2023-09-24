import { useEffect, useState, useRef, MutableRefObject, FormEvent } from 'react'
import api from '@/services/api';
import './ProductManager.scss'

import { Spin, Modal } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';
import Loading from '@/pages/components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { categoryActions } from '@/stores/slices/category.slice';
interface Category {
    [x: string]: any;
    id: string;
    title: string;
    avatar: string;
}
interface Picture {
    file: File;
    url: string;
}

export default function ProductManager() {
    const [load, setLoad] = useState(false);
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );
    //const imgPreviewRef: MutableRefObject<HTMLImageElement | null> = useRef(null);
    const categoryStore = useSelector((store: StoreType) => {
        return store.categoryStore
    })
    const dispatch = useDispatch()
    const [pictures, setPictures] = useState<Picture[]>([]);
    // const [avatarFile, setAvatarFile] = useState<File | null>(null);
    useEffect(() => {
        api.categoryApi.findMany()
            .then(res => {
                if (res.status != 200) {
                    alert(res.data.message)
                } else {
                    dispatch(categoryActions.getCategory(res.data))
                }
            })
    }, [])
    useEffect(() => {
        console.log("categoryStore", categoryStore);
    }, [categoryStore]);
    // function addNewProduct(e: FormEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //     let formData = new FormData();
    //     formData.append("product", JSON.stringify({
    //         categoryId: (e.target as any).categoryId.value,
    //         name: (e.target as any).name.value,
    //         des: (e.target as any).des.value,
    //         price: (e.target as any).price.value,
    //     }))
    //     formData.append("imgs", avatarFile!)
    //     for (let i in pictures) {
    //         formData.append("imgs", pictures[i].file)
    //     }

    //     api.productApi.create(formData)
    //         .then(res => {
    //             console.log("res", res)
    //             Modal.success({
    //                 content: "Add Product sucsses"

    //             });
    //         })
    //         .catch(err => {

    //         })

    // }

    return (
        <div>
            <div className="form_container">
                <h1>Add Product</h1>
                <form
                    // onSubmit={(e) => {
                    //     addNewProduct(e);
                    // }}
                    className="form_add"

                >
                    <div className="form_add_product">
                        <select
                            name='categoryId'
                            style={{
                                border: "1px solid black",
                                borderRadius: "5px",
                                height: "40px",
                                width: "150px"
                            }}
                        >
                            {
                                (categoryStore! as Category)?.map((category: any) => <option key={Math.random() * Date.now()} value={(category as Category).id}>{(category as Category).title}</option>)
                            }

                        </select>
                        <br />
                        <input type="text" placeholder="Name Product" name="name"></input>

                        <input type="text" placeholder="Des" name="des"></input>

                        <input type="text" placeholder="Price" name="price"></input>
                        {/* {
                            load && <Loading />
                        } */}
                        <button style={{ color: "black", backgroundColor: "black" }} className={`${load && ' active'} btn_submit btn btn-info`} type="submit">
                            Add
                        </button>
                        {/* <div className='btn_loading'>
                            <Spin indicator={antIcon} />
                        </div> */}
                    </div>
                    <div className="form_add_avatar">
                        <div>
                            Avatar <br />
                            <input name='imgs' type="file" onChange={(e) => {
                                // if (e.target.files) {
                                //     if (e.target.files.length > 0) {
                                //         (imgPreviewRef.current! as HTMLImageElement).src = URL.createObjectURL(e.target.files[0]);
                                //         setAvatarFile(e.target.files[0])
                                //     }
                                // }
                            }} />
                            <img src='https://content.gobsn.com/i/bodyandfit/no-xplode_Image_01?layer0=$PDP$'
                                // ref={imgPreviewRef}
                                style={{ width: "100px", height: "100px", borderRadius: "50%", marginTop: "10px", marginBottom: "10px" }} />
                        </div>
                        <div>
                            Pictures <br />
                            <input name="imgs" type="file" multiple onChange={(e) => {
                                if (e.target.files) {
                                    if (e.target.files.length > 0) {
                                        let tempPictures: Picture[] = [];
                                        for (let i in e.target.files) {
                                            if (i == "length") {
                                                break
                                            }
                                            tempPictures.push({
                                                file: e.target.files[i],
                                                url: URL.createObjectURL(e.target.files[i])
                                            })
                                        }
                                        setPictures(tempPictures)
                                    }
                                }
                            }} />
                            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                                {/* {
                                    pictures.map(picture => <img src={picture.url} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />)
                                } */}
                            </div>
                        </div>
                        <br />
                    </div>
                </form>
            </div>
        </div>
    )
}
