import { Outlet, Link, useNavigate } from 'react-router-dom'
import './admin.scss'

export default function Admin() {
    const navigate = useNavigate()
    return (

        <div className='container'>
            <div className='container_title'>
                <div style={{ display: "flex" }} className='addmin'>
                    <h1>ADMIN</h1>
                    <h1 style={{ cursor: "pointer" }} onClick={() => {
                        navigate('/')
                    }}>\Home</h1>
                </div>
                <div className='Manager'>
                    {/* <div className="dropdown">
                        <button
                            className="dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Product Manager
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <Link className="dropdown-item" to="productManager">
                                Add Product
                            </Link>
                            <Link className="dropdown-item" to="listProduct">
                                List Product
                            </Link>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button
                            className="dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            User Manager
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">
                                User Receipt
                            </a>
                            <Link className="dropdown-item" to="userManager">
                                Guest Receipt
                            </Link>
                        </div>
                    </div> */}
                    <div>
                        <h1 style={{ fontWeight: "bold" }}><i className="fa-brands fa-product-hunt"></i> Product Manager</h1>
                        <div style={{ marginLeft: "20px" }}>
                            <Link className="dropdown-item" to="productManager">1. Add Product </Link>
                            <Link className="dropdown-item" to="listProduct"> 2. List Product </Link>
                        </div>
                    </div>
                    <div>
                        <h1 style={{ fontWeight: "bold" }}> <i className="fa-solid fa-user"></i> User Manager</h1>
                        <div style={{ marginLeft: "20px" }}>
                            <Link className="dropdown-item" to="userManager">1. User Receipt </Link>
                            <Link className="dropdown-item" to="Manager">2. Guest Receipt</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container_content'>
                <div className='container_content_search'>
                    <input type="text" placeholder='Search' />
                </div>
                <div className='container_content_manager'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
