import React, {useState} from "react";
import {errorMessage, strongPasswordCheck, successMessage, validateEmail} from "../ToolBox";
import {useNavigate} from "react-router-dom";
import productImage from '../img/1.jpeg'
import {Register} from "../service/AuthService";

export default function SignUp() {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate();



    const signUp = () => {
        if (username === "" || email === "" || password === "") {
            return errorMessage("no empty fields allowed")
        }
        if (!strongPasswordCheck(password)){
            return errorMessage("your password is not strong enough")
        }
        if (password !== confirmPassword) {
            return errorMessage("the passwords entered do not match!")
        }
        if (validateEmail(email)){
            console.log('everything seems right')
            Register(username, email, password).then(res => {
                if (res.code === 0) {
                    localStorage.setItem('user', JSON.stringify(res.data))
                    window.location.replace(`/home`);
                } else {
                    errorMessage(res['msg'])
                }
            })
        }else{
            return errorMessage('invalid email address')
        }


    }

    return (
        <>
            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block" >
                                        <img src={productImage} alt="sign up background image" height="100%" />
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                            </div>
                                            <form className="user">
                                                <div className="form-group">
                                                    <input type="string" className="form-control form-control-user"
                                                           id="username" placeholder="Username" value={username}
                                                           onChange={(e) => setUsername(e.target.value)} required/>
                                                    <br/>
                                                    <input type="email" className="form-control form-control-user"
                                                           id="email" placeholder="E-mail" value={email}
                                                           onChange={(e) => setEmail(e.target.value)}/>
                                                    <br/>
                                                    <input type="password" className="form-control form-control-user"
                                                           id="password" placeholder="Password" value={password}
                                                           onChange={(e) => setPassword(e.target.value)}/>
                                                    <br/>
                                                    <input type="password" className="form-control form-control-user"
                                                           id="confirmPassword" placeholder="Confirm Password"
                                                           value={confirmPassword}
                                                           onChange={(e) => setConfirmPassword(e.target.value)}/>
                                                </div>
                                                <a className="btn btn-primary btn-user btn-block float-end mt-2 mb-4"
                                                   onClick={signUp}
                                                >
                                                    Sign Up
                                                </a>
                                            </form>
                                            <a href="#" onClick={()=> navigate('/')}>Login</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}
