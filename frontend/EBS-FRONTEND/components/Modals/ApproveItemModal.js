import { useEffect, useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import Router from "next/router";


const ApproveItemModal = ({ modalIsOpen, toggleModal, data,setData, confirmHandler }) => {
    const [activateConfrim, setActivateConfirm] = useState(false);
    const [activateVendorDetails, setActivateVendorDetails] = useState(false)
    const [activateVendorPhone, setActivateVendorPhone] = useState(false)
    const [defaultNumber, setDefaultNumber] = useState(true)
    const [validatePhone,setValidatePhone]=useState(false)
    const [oldNumber,setOldNumber]=useState('')
    const [count,setCount]=useState(0)
    const handleInput = (e) => {
        const input = e.target.value
        if (input === data.ItemName) {
            setActivateVendorDetails(true)
        }
        else {
            setActivateVendorDetails(false)
        }
    }
    const toggleDefaultNumber = () => {
        setDefaultNumber(!defaultNumber)
    }
    const toggleActivateVendorPhone=()=>{
        setActivateVendorPhone(true)
    }
    const handlePhoneNumberInputChange=(e)=>{
        const value=e.target.value;
        setData({...data,vendorPhone:value})
        CheckIfPhoneIsValid(value)
    }
    const CheckIfPhoneIsValid=(phone)=>{
        if(phone.length ===10){
            setValidatePhone(true)
            setActivateConfirm(true)
        }
        else{
            setValidatePhone(false)
            setActivateConfirm(false)
        }
    }
    useEffect(()=>{
        CheckIfPhoneIsValid(data.vendorPhone)
        if(count !==0){
            if(!defaultNumber){
                setData({...data,vendorPhone:oldNumber})
            }
        }
        setCount(count+1)
    },[defaultNumber])
    useEffect(()=>{
        setOldNumber(data.vendorPhone)
    },[])
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
                    {activateVendorDetails && (<div>
                        <table className="table table-borderless">
                            <thead>
                                <tr className="table-primary">
                                    <td>Description of the item to be bought</td>
                                </tr>
                            </thead>
                            <div className="mx-3">
                                <tbody>
                                    <tr>
                                        <td>EBS reviewer:</td>
                                        <td>{data.reviewerFirstName} {data.reviewerLastName}</td>
                                    </tr>
                                    <tr>
                                        <td>Item assigned:</td>
                                        <td>{data.itemAssigned}</td>
                                    </tr>
                                    <tr>
                                        <td>Price of the item:</td>
                                        <td> {data.price} RWF</td>
                                    </tr>
                                </tbody>
                            </div>
                        </table>
                        <div className="mt-0 mx-3">
                            <button className="btn btn-primary btn-sm" onClick={toggleActivateVendorPhone}>Proceed</button>
                        </div>
                    </div>)}
                    {activateVendorPhone && (<div>
                        <div className="mt-0 mx-3 mt-2">
                            <div className="d-flex flex-flow">
                                <div>
                                    <input className="form-check-input" type="checkbox" value="" id="default" onClick={toggleDefaultNumber} checked={defaultNumber} />
                                    <label className="form-check-label mx-1" for="default">
                                        {defaultNumber ? <p> Default number</p> : <p> New number</p>}
                                    </label>
                                </div>
                                <div>
                                    <input type="text" className={`form-control mx-2 ${validatePhone? "is-valid":"is-invalid"}`} value={data.vendorPhone} disabled={defaultNumber} onChange={handlePhoneNumberInputChange}/>
                                </div>
                            </div>
                        </div>
                    </div>)}
                    <div className="d-flex justify-content-end m-4">
                        <button type="button" className="btn btn-light mx-4" onClick={() => toggleModal()}>Cancel</button>
                        <button type="button" className={!activateConfrim ? "btn btn-light" : "btn btn-primary"} disabled={!activateConfrim} onClick={confirmHandler}>Confirm</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ApproveItemModal;