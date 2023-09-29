import React, {useEffect, useState} from "react";
import Navigation from "./Navigation";
import MidSection from "./MidSection";
import {Checkout, getCartItems, RemoveFromCart} from "../service/CartService";
import {useNavigate, useParams} from "react-router-dom";
import {errorMessage, successMessage} from "../ToolBox";

export default function Cart() {

    const [cartItems, setCartItems] = useState([])
    const [user, setUser] = useState({})
    const {id} = useParams();
    const navigate = useNavigate();


    const removeFromCart = (index, item) => {
        if (index >= 0 && index < cartItems.length) {
            cartItems.splice(index, 1); // Removes 1 item at the specified index
            // Update the cart in localStorage if needed
            localStorage.setItem('cart', JSON.stringify(cartItems));
            RemoveFromCart(item.user_id, item.product.id).then(res => successMessage('Item removed from cart'))
        } else {
            errorMessage('Invalid index:');
        }
    }


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        // setCartItems(JSON.parse(localStorage.getItem('cart')))
        getCartItems(id).then(res => {
            setCartItems(res.data)
        })
    }, [])

    const checkout = () => {
        localStorage.removeItem('cart');
        Checkout(user.id).then(res => navigate('/home'))
    }

    const calculateTotalPrice = (cartItems) => {
        // Use the reduce function to calculate the overall total
        return cartItems.reduce((total, item) => {
            const {price} = item.product;
            const {quantity} = item
            // Ensure both price and quantity are valid numbers before adding to the total
            if (typeof price === 'number' && typeof quantity === 'number' && !isNaN(price) && !isNaN(quantity)) {
                return total + price * quantity;
            }
            // If price or quantity is invalid, return the current total without adding anything
            return total;
        }, 0);
    }
    return (
        <>
            <Navigation/>
            <MidSection/>
            <div className="container mt-5">
                <h1>Your shopping cart</h1>

                <table className="table">
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product.name}</td>
                            <td>£{item.product.price}</td>
                            <td>{item.quantity}</td>
                            <td>£{(item.product.price * item.quantity)}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => removeFromCart(index, item)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="text-end">
                    <strong>
                        Total: £{calculateTotalPrice(cartItems)}
                    </strong>
                </div>
                <div className="text-end mt-3">
                    <button className="btn btn-primary" onClick={checkout}>Checkout</button>
                </div>
            </div>
        </>
    )
}
