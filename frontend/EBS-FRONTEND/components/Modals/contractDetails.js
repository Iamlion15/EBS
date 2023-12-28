import { useState } from "react";
import { Modal, ModalFooter } from "reactstrap";


const ContractDetailModal = ({ modalIsOpen, toggleModal, contractData,setContractData }) => {
    const [checkEmpty, setCheckEmpty] = useState(false);
    const addInfo=(e)=>{
        e.preventDefault();
        if ( contractData.contract.startDate.trim() === "" && contractData.contract.endDate.trim() === "") {
           setCheckEmpty(true)
       }
       else {
           setCheckEmpty(false)
           toggleModal()
       }
   }
    return (
        <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center" size='md'>
            <div>
                <div className="m-4">
                    <h3 className="text-primary">Contract information</h3>
                </div>
                {checkEmpty && (<div className="alert alert-danger alert-dismissible m-0 p-0">
                            <p className="m-2">Please fill in data</p>
                        </div>)}
                <form className="m-4">
                    <div className="row">
                        <div className="col">
                            <div className="form-floating">
                                <input type="date"
                                    className="form-control"
                                    id="startdate"
                                    value={contractData.contract.startDate}
                                    onChange={(e) => setContractData({ ...contractData, contract:{...contractData.contract,startDate:e.target.value }})}
                                />
                                <label htmlFor="fname">Start Date</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating">
                                <input type="date"
                                    className="form-control"
                                    id="enddate"
                                    value={contractData.contract.endDate}
                                    onChange={(e) => setContractData({ ...contractData, contract:{...contractData.contract,endDate:e.target.value }})}
                                />
                                <label htmlFor="lname">End date</label>
                            </div>
                        </div>
                    </div>
                    <ModalFooter className="m-4">
                        <button type="button" class="btn btn-outline-danger" onClick={() => toggleModal()}>Cancel</button>
                        <button type="button" class="btn btn-success" onClick={addInfo}>set</button>
                    </ModalFooter>
                </form>
            </div>
        </Modal>
    )
}



export default ContractDetailModal;