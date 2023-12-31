import SearchProduct from '@/pages/searchProduct/SearchProduct';
import './navbar.scss'
import { Modal } from "antd";
import { useTranslation } from 'react-i18next'
//import i18n from '@/i18n/config';

import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../../../stores'
import api from '../../../../services/api'
import { useEffect, useState } from 'react';
import { User, userAction } from '../../../../stores/slices/user';
import axios, { AxiosResponse } from 'axios';
import { Link, useParams } from 'react-router-dom';
//import { Link } from 'react-router-dom';



export default function Navbar() {


    function changeLanguage(lang: string) {
        localStorage.setItem("locales", lang);
        window.location.reload();
    }
    const { t, i18n } = useTranslation();

    const dispatch = useDispatch();
    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })

    const guestCartStore = useSelector((store: StoreType) => {
        return store.guestCartStore
    })



    return (
        <div className='nav'>
            {/* Before Nav */}
            <div className='before_nav'>
                <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-ride="carousel"
                >
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <b>{t('B')}</b>

                            <u>{t('BuyNow')}</u>
                        </div>
                        <div className="carousel-item">
                            {t('A')}
                            <u>{t('BuyNow')}</u>
                        </div>
                        <div className="carousel-item">
                            <b>{t('C')}</b>
                            <u>{t('BuyNow')}</u>
                        </div>
                    </div>
                </div>
            </div>

            <nav>
                <div className="nav_content">
                    <div className="left_content">
                        <h1
                            onClick={() => {
                                window.location.href = "/";
                            }}
                        >
                            <img style={{ height: "50px", marginTop: "5px" }} src="../images/logo.png" alt="" />
                        </h1>
                    </div>
                    <div className="middle_content">
                        <a
                            className="item"
                            href="/"
                            style={{ color: "black", textDecoration: "none" }}
                        >
                            {t('Home')}
                        </a>

                        <a
                            className="item"
                            style={{ color: "black", textDecoration: "none" }}
                            href='http://localhost:5173/categories/8c362aed-c08a-463f-8547-87e6c4c7d66e'
                        >
                            {t('Skincare')}

                        </a>
                        <a
                            className="item"
                            style={{ color: "black", textDecoration: "none" }}
                            href="http://localhost:5173/categories/007a9eca-5c88-4d40-add2-d6dae26da9c3"
                        >
                            {t('MakeUp')}
                        </a>
                        <a
                            className="item"
                            style={{ color: "black", textDecoration: "none" }}
                            href="http://localhost:5173/categories/f0350b39-8c05-4dd7-842b-c41c35b14d91"
                        >
                            {t('PERPUME')}
                        </a>
                        <a
                            className="item"
                            style={{ color: "black", textDecoration: "none" }}
                            href="https://cakerun.com.au/about-us/"
                        >
                            {t('About')}
                        </a>
                    </div>

                    <div className="right_content">
                        {/* Search */}
                        <div className="searchBox d-flex" role="search">
                            <div id="search_box">
                                <SearchProduct />
                            </div>
                        </div>
                        {localStorage.getItem("token") ? (
                            <>
                                <div className="dropdown" >
                                    <button
                                        className="dropdown-toggle"
                                        // type="button"
                                        id="dropdownMenuButton"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        Hi {(userStore.data! as User)?.userName}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="/profile">
                                            {t('Profile')}
                                        </a>
                                        <a className="dropdown-item" href="/recipt">
                                            {t('recipt')}
                                        </a>
                                        {(userStore.data! as User)?.role == "ADMIN" ? (
                                            <a className="dropdown-item" href="/admin/productManager">
                                                Admin
                                            </a>
                                        ) : (
                                            <></>
                                        )}
                                        <p style={{ cursor: "pointer" }} className="dropdown-item" onClick={() => {
                                            Modal.confirm({
                                                content: t('confirmLogout'),
                                                onOk: () => {
                                                    localStorage.removeItem("token");
                                                    userStore.socket?.disconnect();
                                                    dispatch(userAction.setCart(null))
                                                    dispatch(userAction.setData(null))
                                                    dispatch(userAction.setReceipt(null))
                                                    dispatch(userAction.setSocket(null))
                                                    window.location.href = '/'
                                                },
                                            });

                                        }}>Log out</p>
                                    </div>
                                </div>

                            </>


                        ) : (
                            <div className="dropdown">
                                <a
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="fa-regular fa-user"> </i>
                                </a>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <a className="dropdown-item" href="/register">
                                        {t('register')}
                                    </a>
                                    <a className="dropdown-item" href="/login">
                                        {t('login')}
                                    </a>
                                    <a className="dropdown-item" href="/CheckOrder">
                                        {t('recipt')}
                                    </a>
                                </div>
                            </div>
                        )}
                        {/* Cart */}
                        <div style={{ display: "flex", marginTop: "5px" }}>
                            <i
                                onClick={() => {
                                    window.location.href = "/cart";
                                }}
                                className="fa-solid fa-bag-shopping"
                                style={{ cursor: "pointer" }}
                            > </i>
                            {/* <p style={{ color: "red" }}>{userStore.cart?.detail.reduce((value, cur) => {
                                return value += cur.quantity
                            }, 0)}</p> */}
                            {
                                userStore.socket ? <p style={{ color: "red" }}>{userStore.cart?.detail.reduce((value, cur) => {
                                    return value += cur.quantity
                                }, 0)}</p>
                                    : <p style={{ color: "red" }}>{guestCartStore.cart?.reduce((value, cur) => {
                                        return value + cur.quantity
                                    }, 0)}</p>
                            }
                        </div>
                        <div className="dropdown">
                            <a
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <a style={{ display: "flex", gap: "10px" }} className="dropdown-item" href="">
                                    {i18n.language === 'en' && <img style={{ width: "20px", height: "15px", marginTop: "5px" }} src="https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png" alt="" />}
                                    {i18n.language === 'vi' && <img style={{ width: "20px", height: "15px", marginTop: "5px" }} src="https://cdn.countryflags.com/thumbs/vietnam/flag-400.png" alt="" />}
                                </a>

                            </a>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                            >
                                <a style={{ display: "flex", gap: "10px" }} className="dropdown-item" href="">
                                    <img style={{ width: "20px", height: "15px", marginTop: "5px" }} src="https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png" alt="" />
                                    <p onClick={() => {
                                        changeLanguage('en')
                                    }}> {t('eng')}</p>
                                </a>
                                <a style={{ display: "flex", gap: "10px" }} className="dropdown-item" href="">
                                    <img style={{ width: "20px", height: "15px", marginTop: "5px" }} src="https://cdn.countryflags.com/thumbs/vietnam/flag-400.png" alt="" />
                                    <p onClick={() => {
                                        changeLanguage('vi')
                                    }}> {t('vi')}</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
