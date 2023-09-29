import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {purchaseItem} from "../service/CartService";
import {errorMessage, successMessage} from "../ToolBox";
import {fetchProducts} from "../service/ProductService";
import productImage from '../img/1.jpeg'



export default function Products() {

    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [searchInput, setSearchInput] = useState('');
    const [products, setProducts] = useState([])



    const getProducts = () => {
        fetchProducts().then(res => {
            setProducts(res.data)
        })
    }


    useEffect(() => {
        getProducts()
    }, [])


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])


    const addToCart = (product) => {
        let cartItems = JSON.parse(localStorage.getItem('cart'))
        if (!cartItems) {
            cartItems = [];
        }
        cartItems.push(product)
        localStorage.setItem('cart', JSON.stringify(cartItems))
        purchaseItem(user.id, product.id).then(res => {
            if (res.code === 0) {
                successMessage("Item added to cart");
            } else {
                errorMessage(res.msg);
            }
        });
    }
    const handleNavigation = (page) => {
        navigate(page);
    };

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        setSearchInput(searchText);

        if (searchText === '') {
            getProducts()
        } else {
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(searchText)
            );
            setProducts(filteredProducts);
        }
    };


    const Items = ({items}) => {
        return (
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {
                    items.map((product, index) => (
                        <div className="col mb-5" key={index}>
                            <div className="card h-100">
                                <img className="card-img-top"
                                     src={productImage}
                                     alt="Product Image"/>
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">{product.name}</h5>
                                        £{product.price}
                                    </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <a className="btn btn-outline-dark mt-auto"
                                           onClick={() => handleNavigation(`/product/${product.id}`)}>View</a>
                                        <button className="btn btn-outline-dark mt-auto m-lg-2"
                                                onClick={() => addToCart(product)}
                                                disabled={product.quantity < 1}
                                        >{product.quantity < 1 ? "Out of Stock" : "Add to cart"}</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <>
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="col-3 moveCenter">
                        <input className="form-control" placeholder="Search Products" value={searchInput} onChange={handleSearch}/>
                    </div>

                    <Items items={products} />

                </div>
            </section>
        </>
    )
}
