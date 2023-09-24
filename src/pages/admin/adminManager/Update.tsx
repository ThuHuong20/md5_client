import api from '@/services/api';
import './upDate.scss';
import { Modal, message } from 'antd';
import { useRef, useState } from 'react';

type UpdateProductProps = {
    [x: string]: any;
    product: any;
};

export default function Update(props: UpdateProductProps) {
    const [updateData, setUpdateData] = useState(props.product);
    const urlPreviewRef = useRef<HTMLImageElement>(null);

    async function updateProduct(eventForm: any) {
        eventForm.preventDefault();
        let updateInfor = {
            name: eventForm.target.name.value,
            des: eventForm.target.des.value,
            price: Number(eventForm.target.price.value),
        };

        let formData = new FormData();
        if (eventForm.target.avatar.files.length > 0) {
            formData.append('avatar', eventForm.target.avatar.files[0]);
        }
        formData.append('product_infor', JSON.stringify(updateInfor));

        api.productApi
            .update(updateData.id, formData)
            .then((res) => {
                if (res.status === 200) {
                    message.success(res.data.message);
                } else {
                    Modal.error({
                        content: res.data.message,
                    });
                }
            })
            .catch((err) => {
                console.log('err', err);
            });


    }
    return (
        <form
            onSubmit={(eventForm) => {
                updateProduct(eventForm);
            }}
        >
            {/* Button trigger modal */}
            <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModalCenter"
            >
                Update
            </button>
            {/* Modal */}
            <div
                style={{ color: 'black' }}
                className="modal fade"
                id="exampleModalCenter"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Update
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-body_update">
                                <div className="modal-body_update_avatar">
                                    <h1 style={{ marginRight: '300px' }}>Avatar</h1>
                                    <img src={props.product.avatar} alt="" ref={urlPreviewRef} />
                                    <br />
                                    <input
                                        name="avatar"
                                        onChange={(event: any) => {
                                            if (event.target.files.length === 0) {
                                                console.log('Chưa chọn hình!');
                                            } else {
                                                let blobUrl = URL.createObjectURL(
                                                    event.target.files[0]
                                                );
                                                if (urlPreviewRef.current) {
                                                    urlPreviewRef.current.src = blobUrl;
                                                }
                                            }
                                        }}
                                        type="file"
                                        style={{ marginRight: '300px' }}
                                    />
                                </div>
                                <div className="modal-body_update_input">
                                    <input
                                        id="name"
                                        name="name"
                                        placeholder="Name Product"
                                        defaultValue={props.product.name}
                                    />
                                    <br />
                                    <input
                                        id="desc"
                                        name="des"
                                        placeholder="Description"
                                        defaultValue={props.product.des}
                                    />
                                    <br />
                                    <input
                                        id="price"
                                        name="price"
                                        placeholder="Price"
                                        defaultValue={props.product.price}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                style={{ backgroundColor: '#999' }}
                                type="submit"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                style={{ backgroundColor: ' #3146d2' }}
                                type="submit"
                                className="btn btn-primary"
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
