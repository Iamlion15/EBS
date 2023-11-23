import { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";


const ApproveItemModal = ({ modalIsOpen, toggleModal, data, confirmHandler }) => {
    const [activateConfrim, setActivateConfirm] = useState(false);
    const handleInput = (e) => {
        const input = e.target.value
        if (input === data.ItemName) {
            setActivateConfirm(true)
        }
        else {
            setActivateConfirm(false)
        }
    }
    return (
        <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center font-monospace" size='md'>
            <div>
                <ModalHeader>
                    <div className="m-2">
                        <h4 className="text-primary">Approve item?</h4>
                    </div>
                </ModalHeader>
                <div>
                    <div className="m-3">
                        <span className="mb-2">If u need more information on : <strong> {data.firstname} {data.lastname}</strong> 's document,</span>
                        <span className="mb-2">there is a portal for asking more details,Thank You.</span>
                        <div className="mt-2">
                            <p className="text-sucess"><small>Type in item name<span className="text-primary"> "{data.ItemName}" </span>to approve request of this item </small></p>
                            <input type="text" className="form-control" onChange={handleInput} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-end m-4">
                        <button type="button" className="btn btn-light mx-4" onClick={() => toggleModal()}>Cancel</button>
                        <button type="button" className={!activateConfrim ?"btn btn-light":"btn btn-primary"} disabled={!activateConfrim} onClick={confirmHandler}>Confirm</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ApproveItemModal;