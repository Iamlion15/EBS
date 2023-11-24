import { useState, useRef } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DeleteModal = ({ modalIsOpen, toggleModal, id, ToastContainer }) => {
    const toastId = useRef(null)
    const deleteDocumentHandler = async (e) => {
        e.preventDefault();
        toastId.current = toast.info("Loading............", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: false
        })
        try {
            const config = {
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': JSON.parse(localStorage.getItem("token"))
                }
            }
            const response = await axios.delete(`http://localhost:4000/api/item/delete/${id}`, config)
            toast.update(toastId.current, { render: "Successfully deleted data", type: toast.TYPE.SUCCESS, autoClose: 2000 })
            toggleModal()
        } catch (error) {
            console.log(error)
            toast.update(toastId.current, { render: "Failure", type: toast.TYPE.ERROR, autoClose: 2000 })
        }
    }
    return (
        <div>
            <Modal isOpen={modalIsOpen} toggle={toggleModal} className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <ModalBody>
                    <div className='d-flex justify-content-center'>
                        <p className='font-monospace'>Are you sure you want to delete this document?</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => toggleModal()}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={(e) => deleteDocumentHandler(e)}>
                        Delete the document
                    </Button>
                </ModalFooter>
                <div>
                    <ToastContainer />
                </div>
            </Modal>
        </div>
    );
}

export default DeleteModal;
