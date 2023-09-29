import React, {useState} from "react";
import {errorMessage, validateEmail} from "../ToolBox";
import {SignIn} from "../service/AuthService";
import {useNavigate} from "react-router-dom";
import productImage from '../img/2.png'



export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();



    const login = () => {
        if (validateEmail(email)){
            if (email === "" || password === "") {
                return errorMessage("no empty fields allowed")
            }
            SignIn(email, password).then(res => {
                if (res.code === 0) {
                    localStorage.setItem('user', JSON.stringify(res.data))
                    window.location.replace(`/home`);
                } else {
                    errorMessage(res['msg'])
                }
            })
        }else{
            errorMessage('invalid email address')
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
                                    <div className="col-lg-6 d-none d-lg-block">
                                        <img src={productImage} alt="login background image" height="100%" />
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                            </div>
                                            <form className="user">
                                                <div className="form-group">
                                                    <input type="email" className="form-control form-control-user"
                                                           id="email" placeholder="E-mail" value={email}
                                                           onChange={(e) => setEmail(e.target.value)}/>
                                                    <br/>
                                                    <input type="password" className="form-control form-control-user"
                                                           id="password" placeholder="Password" value={password}
                                                           onChange={(e) => setPassword(e.target.value)}/>
                                                </div>
                                                <a className="btn btn-primary btn-user btn-block float-end mt-2 mb-4"
                                                   onClick={login}
                                                >
                                                    Sign In
                                                </a>
                                            </form>
                                            <a href="#" onClick={()=> navigate('/signup')}>Sign Up</a>
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
