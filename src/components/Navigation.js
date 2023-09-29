import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Navigation() {

    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [cartItems, setCartItems] = useState([])


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        setCartItems(JSON.parse(localStorage.getItem('cart')))
    }, []);

    const logout = () => {
        localStorage.clear()
        navigate('/')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container px-4 px-lg-5">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation"><span
                        className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li className="nav-item"><a className="nav-link active finger" aria-current="page"
                                                        onClick={() => navigate('/home')}>Home</a></li>
                        </ul>
                        <span className="mt-2">Hello, {user.username}</span>
                        <form className="d-flex move">

                            <button className="btn btn-outline-dark" type="submit" onClick={() => navigate(`/cart/${user.id}`)}>
                                <i className="bi-cart-fill me-1"></i>
                                Cart
                                <span className="badge bg-dark text-white ms-1 rounded-pill">{cartItems ? cartItems.length : 0}</span>
                            </button>
                            <button className="btn btn-outline-danger move" onClick={logout}>
                                <i className="bi bi-box-arrow-right me-1"></i> Logout
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}
