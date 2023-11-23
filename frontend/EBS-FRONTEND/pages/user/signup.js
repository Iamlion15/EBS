import { useState,useRef } from "react";
import Image from "next/image";
import Footer from "../../components/Footer/footer";
import axios from "axios";
import Link from "next/link";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserSignup = () => {
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        nID: "",
        role: "",
        email: "",
        password: ""
    })
    const toastId=useRef(null)

    const signupHandler=async(e)=>{
        e.preventDefault();
        toastId.current=toast.info("saving............",{
            position:toast.POSITION.TOP_LEFT,
            autoClose:false
        })
        console.log(data)
        try {
            const response=await axios.post("http://localhost:4000/api/user/signup",data)
            toast.update(toastId.current,{render: "Successfully saved",type:toast.TYPE.SUCCESS,autoClose:2000})
        } catch (error) {
            toast.update(toastId.current,{render: "Error in saving",type:toast.TYPE.ERROR,autoClose:2000})
            console.log(error)
        }
    }

    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center font-monospace" style={{ minHeight: "100vh", backgroundColor: "#4c97ff" }}>
                <div className="card shadow p-4 rounded">
                    <div className="row">
                        <div className="col-6">
                            <div className="h3 text-primary"><strong>Create Account</strong></div>
                        </div>
                    </div>
                    <div>
                        <div className="row px-lg-5 mx-lg-5" style={{ width: "900px" }}>
                            <div className="col">
                                <form className="mt-4">
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-floating">
                                                <input type="text"
                                                    className="form-control"
                                                    id="fname"
                                                    value={data.firstname}
                                                    onChange={(e) => setData({ ...data, firstname: e.target.value })}
                                                />
                                                <label htmlFor="fname">First name</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-floating">
                                                <input type="text"
                                                    className="form-control"
                                                    id="lname"
                                                    value={data.lastname}
                                                    onChange={(e) => setData({ ...data, lastname: e.target.value })}
                                                />
                                                <label htmlFor="lname">Last name</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <div className="form-floating">
                                                <input type="email"
                                                    className="form-control"
                                                    id="email"
                                                    value={data.email}
                                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                                />
                                                <label htmlFor="email">Email</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-floating">
                                                <input type="text"
                                                    className="form-control"
                                                    id="nid"
                                                    value={data.nID}
                                                    onChange={(e) => setData({ ...data, nID: e.target.value })}
                                                />
                                                <label htmlFor="nid">NID</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <select className="form-select" value={data.role} onChange={(e) => setData({ ...data, role: e.target.value })}>
                                                <option>Role</option> 
                                                <option value="STAFF">STAFF</option>
                                                <option value="FINANCE">FINANCE</option>
                                                <option value="EBS">EBS</option>
                                            </select>
                                        </div>
                                        <div className="col">
                                            <div className="form-floating">
                                                <input type="password"
                                                    className="form-control"
                                                    id="password"
                                                    value={data.password}
                                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                                />
                                                <label htmlFor="fname">Password</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-group mt-4'>
                                        <button type="submit"
                                            className="btn btn-outline-primary mt-2"
                                            style={{ width: "50%" }}
                                            onClick={signupHandler}
                                        >
                                            Sign up</button>
                                    </div>
                                    <div className="d-flex justify-content-center mt-4">
                                        <p> <span className="lead text-sm">Already have an account?</span><span className="text-primary text">
                                            <strong>
                                                <Link href="/"><a>Sign in?</a></Link>
                                                </strong></span></p>
                                    </div>
                                </form>
                            </div>
                            <div className="col">
                                <Image
                                    src="/images/logine.jpg"
                                    width={500}
                                    height={500}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                 {/* <ToastContainer /> calling our toast containers */}
                <div>
                <ToastContainer />
                </div>
                <div className="mt-4">
                    <Footer />
                </div>
            </div>
        </>
    )
}


export default UserSignup;