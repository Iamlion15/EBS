import { useState, useRef } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const TerminateContract = ({ modalIsOpen, toggleModal, selectedRow,toggleParentModal }) => {
    const [supportingFile, setSupportingFile] = useState();
    const handleTermination = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "multipart/form-data",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const formdata = new FormData();
            formdata.append('file', supportingFile)
            const response = await axios.post(`http://localhost:4000/api/vendor/terminate/${selectedRow._id}`, formdata, config)
            toast.success('Terminated contract', {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 10000,
            });
            toggleModal();
            toggleParentModal();
        } catch (error) {
            toast.warning('Failed to terminate contract', {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 10000,
            });
            console.log(error)
        }
    }
    return (
        <div>
            <Modal isOpen={modalIsOpen} toggle={toggleModal} className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <ModalHeader toggle={toggleModal}>
                    <div>
                        <p className='display-6'>Terminate contract</p>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="d-flex flex-column align-items-center">
                        <p className="font-monospace status-message">Upload supporting document</p>
                        <div className="input-group mb-3 my-3">
                            <input type="file" className="form-control" id="upload" onChange={(e) => setSupportingFile(e.target.files[0])} />
                            <label className="input-group-text" htmlFor="upload">Upload</label>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={handleTermination}>
                        Yes,terminate contract
                    </button>
                </ModalFooter>
                <ToastContainer />
            </Modal>
        </div>
    );
};

export default TerminateContract;
