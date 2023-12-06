import { useState, useRef } from "react";
import { Modal } from "reactstrap";
import formatDateToCustomFormat from "@/helpers/dateFormatter";
import { formatDateHTMLDATE } from "@/helpers/htmlFormDates";
import RenewContractDates from "../vendorComponents/renewContractDates";
import axios from "axios";
import { toast } from "react-toastify";

const RenewContract = ({ modalIsOpen, toggleModal, contractData, setContractData }) => {
    console.log(contractData);
    const [checkEmpty, setCheckEmpty] = useState(false);
    const [activateOperations, setActivateOperations] = useState(false)
    const [selectedRow, setSelectedrow] = useState()
    const [renewDates, setRenewDates] = useState(false)
    const [newContract, setNewContract] = useState({
        id: "",
        startDate: "",
        endDate: ""
    })
    const toastId = useRef(null)
    const activateRow = (vendor) => {
        vendor.contract.startDate = formatDateHTMLDATE(vendor.contract.startDate)
        vendor.contract.endDate = formatDateHTMLDATE(vendor.contract.endDate)
        setSelectedrow(vendor)
        if (selectedRow === "") {
            setActivateOperations(false)
        }
        else {
            setActivateOperations(true)
        }
    }
    const showRenewContractDatesView = (e) => {
        e.preventDefault();
        setRenewDates(!renewDates)
    }
    const addInfo = (e) => {
        e.preventDefault();
        if (contractData.contract.startDate.trim() === "" && contractData.contract.endDate.trim() === "") {
            setCheckEmpty(true)
        }
        else {
            setCheckEmpty(false)
            toggleModal()
        }
    }
    const ConfirmRenew = async (e) => {
        e.preventDefault();
        toastId.current = toast.info("Loading............", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: false
        })
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.post("http://localhost:4000/api/vendor/updatecontract", newContract, config)
            toast.update(toastId.current, { render: "Successfully sent data", type: toast.TYPE.SUCCESS, autoClose: 2000 })
            toggleModal();
        } catch (error) {
            toast.update(toastId.current, { render: "Failure", type: toast.TYPE.ERROR, autoClose: 2000 })
        }
    }

    return (
        <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center" size='md'>
            <div>
                <div className="m-4">
                    <h3 className="text-primary">Contract information</h3>
                </div>
                {!renewDates ? (<div>
                    <table className="table table-borderless table-responsive table-hover">
                        <thead>
                            <tr className='table-primary'>
                                <td>CONTRACTOR</td>
                                <td>STARTDATE</td>
                                <td>ENDDATE</td>
                            </tr>
                        </thead>
                        <tbody>
                            {contractData.map((contract) => {
                                return (
                                    <>
                                        <tr key={contract._id} style={{ cursor: 'pointer' }} onClick={() => activateRow(contract)} className={selectedRow === contract ? 'table-danger' : ''}>
                                            <td>{contract.firstname} {contract.lastname}</td>
                                            <td>{formatDateToCustomFormat(contract.contract.startDate)}</td>
                                            <td>{formatDateToCustomFormat(contract.contract.endDate)}</td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>) : (
                    <RenewContractDates
                        setRenewDates={setRenewDates}
                        contractData={selectedRow}
                        setContractData={setSelectedrow}
                        setNewContract={setNewContract}
                        newContract={newContract}
                    />
                )}
                <hr />
                {!renewDates ? (<div className="row my-2">
                    <div className="col-6">
                        {activateOperations && (<div className="d-flex justify-content-start">
                            <button type="button" class="btn btn-danger mx-2" onClick={addInfo}>Terminate</button>
                            <button type="button" class="btn btn-primary" onClick={showRenewContractDatesView}>Renew</button>
                        </div>)}
                    </div>
                    <div className="col-6">
                        <div className="d-flex justify-content-end mx-2">
                            <button type="button" class="btn btn-outline-danger" onClick={() => toggleModal()}>Cancel</button>
                        </div>
                    </div>
                </div>) : (
                    <div className="row my-2">
                        <div className="col-6">
                            {activateOperations && (<div className="d-flex justify-content-start">
                                <button type="button" class="btn btn-primary mx-2" onClick={ConfirmRenew}>Confirm renew</button>
                            </div>)}
                        </div>
                        <div className="col-6">
                            <div className="d-flex justify-content-end mx-2">
                                <button type="button" class="btn btn-outline-primary" onClick={showRenewContractDatesView}>GO BACK</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    )
}



export default RenewContract;