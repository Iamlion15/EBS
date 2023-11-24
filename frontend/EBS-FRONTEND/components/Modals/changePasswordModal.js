import { useState, useEffect } from "react";
import { Modal, ModalFooter } from "reactstrap";
import axios from "axios";


const ChangeUserPasswordModal = ({ modalIsOpen, toggleModal }) => {
    const [data, setData] = useState({
        oldpassword: "",
        newpassword: "",
        email: ""
    })
    const [errorMsg, setErrorMsg] = useState("");
    const [showConfirm, setShowConfirm] = useState(true)
    const checkPassword = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.post("http://localhost:4000/api/user/checkpassword", data, config)
            const evaluate = response.data

            if (evaluate.confirm == true) {
                setErrorMsg("")
                setShowConfirm(false)
            }
            else {
                setErrorMsg("Invalid password")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const confirmChangePassword = async (e) => {
        e.preventDefault()
        data.email = JSON.parse(localStorage.getItem("loggedInUser")).email;
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.post("http://localhost:4000/api/user/updatepassword", data, config);
            setShowConfirm(true);
            setData({
                newpassword: "",
                oldpassword: ""
            })
            setErrorMsg("")
            toggleModal();
        } catch (error) {
            console.log(error);
        }
    }
    const cancel = (e) => {
        e.preventDefault();
        setShowConfirm(true);
        setData({
            newpassword: "",
            oldpassword: ""
        })
        setErrorMsg("")
        toggleModal()
    }
    return (
        <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center" size='md'>
            <div>
                <div className="m-4">
                    <h3 className="text-primary">Change Password</h3>
                    {errorMsg && (
                        <div className="card-header alert alert-danger p-0 mx-5" style={{ height: "30px", paddingRight: "40px" }}>
                            <div className=" d-flex justify-content-center mb-5 ">
                                <p className="lead"><strong>{errorMsg}</strong></p>
                            </div>
                        </div>
                    )}

                </div>
                <form className="m-4">
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="old" className="mt-2 mb-2">Old password</label>
                                <input type="text"
                                    className="form-control"
                                    id="old"
                                    placeholder="Enter old password"
                                    value={data.oldpassword}
                                    onChange={(e) => setData({ ...data, oldpassword: e.target.value })}
                                    disabled={!showConfirm}
                                />
                                <small id="emailHelp" className="form-text text-muted">Please enter your old Password</small>
                            </div>
                            {!showConfirm && (
                                <div className="form-group">
                                    <label htmlFor="new" className="mt-2 mb-2">New password</label>
                                    <input type="text"
                                        className="form-control"
                                        id="new"
                                        placeholder="Enter old password"
                                        value={data.newpassword}
                                        onChange={(e) => setData({ ...data, newpassword: e.target.value })}
                                    />
                                    <small id="emailHelp" className="form-text text-muted">Please enter your a new password</small>
                                </div>
                            )}
                            {showConfirm && (
                                <div className="d-flex justify-content-end">
                                    <button type="button" className="btn btn-primary mt-2" onClick={checkPassword}>Confirm</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <ModalFooter className="m-4">
                        <div className="d-flex justify-content-start">
                            <button type="button" className="btn btn-outline-danger" onClick={(e) => cancel(e)}>Cancel</button>
                        </div>
                        {!showConfirm && (
                            <button type="button" className="btn btn-primary" onClick={confirmChangePassword} >Change Password</button>
                        )}

                    </ModalFooter>
                </form>
            </div>
        </Modal>
    )
}



export default ChangeUserPasswordModal;