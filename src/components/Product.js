import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import MidSection from "./MidSection";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../service/ProductService";
import Footer from "./Footer";

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    const addToCart = (product) => {
        console.log(product)
    }

    useEffect(() => {
        fetchProduct(id).then((res) => {
            console.log(res);
            setProduct(res.data);
        });
    }, [id]);

    return (
        <>
            <Navigation />
            <MidSection />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ display: 'flex', maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ flex: 1 }}>
                        <img
                            className="card-img-top"
                            src="https://dummyimage.com/800x600/dee2e6/6c757d.jpg"  // Adjust the image size here
                            alt="product image"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div className="card-body p-4">
                            <div className="text-center">
                                <h5 className="fw-bolder">{product.name}</h5>
                                £{product.price}
                                <p>{product.description}</p>
                            </div>
                        </div>
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <button className="btn btn-outline-dark mt-auto m-lg-2"
                                        onClick={() => addToCart(product)}
                                        disabled={product.quantity < 1}
                                >{product.quantity < 1 ? "Out of Stock" : "Add to cart"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
