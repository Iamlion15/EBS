import { Input, Modal, ModalHeader } from "reactstrap"
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const RejectionModal = ({ modalIsOpen, toggleModal, data,toggleParentModal }) => {
    const [showComment, setShowComment] = useState(false)
    const [comment,setComment]=useState("")
    const [showFunctions,setShowFunctions]=useState(false)
    const RejectRequest = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        const role = JSON.parse(localStorage.getItem("user")).role
        const rejectData={
            requestid:data.id,
            comment:comment,
            role:role
        }
        try {
            const response = await axios.post("http://localhost:4000/api/item/reject",rejectData,config);
            toast.success("Rejected request !", {
                position: toast.POSITION.TOP_RIGHT,autoClose:15000
              });
              toggleModal();
              toggleParentModal()
        } catch (error) {
            toast.warn("Unable to approve !", {
                position: toast.POSITION.TOP_RIGHT,autoClose:15000
              });
        }
    }
    const toggleShowComment=()=>{
        setShowComment(!showComment)
    }
    const handleInput = (e) => {
        const input = e.target.value
        setComment(input)
        if (input === "") {
            setShowFunctions(false)
        }
        else {
            setShowFunctions(true)
        }
    }
    return (
        <>
            <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center font-monospace" size='md'>
                <ModalHeader toggle={toggleModal}>
                    <div className="m-2">
                        <h4 className="text-primary">Reject request?</h4>
                    </div>
                </ModalHeader>
                <div>
                    <div className="m-3">
                        <span className="mb-2"> Are you sure you want to reject this request?</span>
                    </div>
                    {!showComment ? (
                    <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-danger BTN-SM mx-4 my-2" onClick={() => toggleShowComment()}>Yes,Rejct</button>
                    </div>
                    )
                        : (<div className="my-3 mx-3">
                            <p className="text-primary"><small>Type in the reason you are rejecting this request </small></p>
                            <input type="text" className="form-control" value={comment} onChange={handleInput} />
                        </div>)}
                </div>
                {showFunctions&&(<div className="d-flex justify-content-end m-4">
                    <button type="button" className="btn btn-light mx-4" onClick={() => toggleModal()}>cancel</button>
                    <button type="button" className="btn btn-primary" onClick={RejectRequest}>Reject request</button>
                </div>)}
            </Modal>
            <div>
                <ToastContainer />
            </div>
        </>
    )
}

export default RejectionModal;