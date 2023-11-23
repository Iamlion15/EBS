import { useState } from "react";
import { Modal, ModalFooter } from "reactstrap";


const UpdateUserModal = ({ modalIsOpen, toggleModal, data,setData,updateHandler }) => {
    return (
        <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center" size='md'>
            <div>
                <div className="m-4">
                    <h3 className="text-primary">Edit profile</h3>
                </div>
                <form className="m-4">
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
                                    disabled
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
                    <ModalFooter className="m-4">
                        <button type="button" class="btn btn-outline-danger" onClick={() => toggleModal()}>Cancel</button>
                        <button type="button" class="btn btn-success" onClick={updateHandler}>Update</button>
                    </ModalFooter>
                </form>
            </div>
        </Modal>
    )
}



export default UpdateUserModal;