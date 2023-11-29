import { useState, useEffect } from "react";
import { Modal, ModalHeader, Input } from "reactstrap";
import axios from "axios";


const ApproveItemModal = ({ modalIsOpen, toggleModal, data, confirmHandler }) => {
    const [activateConfrim, setActivateConfirm] = useState(false);
    const [showVendors, setShowVendors] = useState(false)
    const [activateConfirmVendor, setActivateConfirmVendor] = useState(true)
    const [showItems, setShowItems] = useState(false)
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedItemValue, setSelectedItemValue] = useState('');
    const [vendors, setVendors] = useState([])
    const [vendorItems,setVendorItems]=useState([])
    const handleInput = (e) => {
        const input = e.target.value
        if (input === data.ItemName) {
            setShowVendors(true)
        }
        else {
            setShowVendors(false)
        }
    }
    const handleSelectVendorChange = async (e) => {
        setSelectedValue(e.target.value);
        setActivateConfirmVendor(false)
 
    }
    const handleSelectVendorItemChange = async (e) => {
        setSelectedItemValue(e.target.value);
        setActivateConfirm(true)
    }

    const findVendorItems = async () => {
        setShowItems(true)
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.get(`http://localhost:4000/api/vendor/vendoritems/${selectedValue}`, config)
            for (let i = 0; i < response.data.length; i++) {
                console.log(response.data);
            }
            setVendorItems(response.data)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(async () => {
        
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.get("http://localhost:4000/api/vendor/vendors", config)
            setVendors(response.data)
            console.log((response.data));
        } catch (error) {
            console.log(error);
        }
    }, [])
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
                        {showVendors && (<div className="mt-3 d-flex flex-column">
                            <div>
                                <Input
                                    type="select"
                                    bsSize="md"
                                    className="selectpicker"
                                    value={selectedValue}
                                    onChange={handleSelectVendorChange}
                                >
                                    <option value="" disabled>Select a vendor</option>
                                    {vendors.map((vendor) => (
                                        <option key={vendor._id} value={vendor._id}>
                                            {vendor.firstname} {vendor.lastname}
                                        </option>
                                    ))}
                                </Input>
                            </div>
                            <div>
                                <button className="btn btn-primary btn-sm mt-2" disabled={activateConfirmVendor} onClick={()=>findVendorItems()}>Confirm</button>
                            </div>
                        </div>)}

                        {showItems && (<div className="mt-3">
                            <Input
                                type="select"
                                bsSize="md"
                                className="selectpicker"
                                value={selectedItemValue}
                                onChange={handleSelectVendorItemChange}
                            >
                                <option value="" disabled>Select a vendor</option>
                                {vendorItems.map((vendoritem) => (
                                    <option key={vendoritem._id} value={vendoritem._id}>
                                    {vendoritem.itemName} -- {vendoritem.itemPrice} RWF
                                    </option>
                                ))}
                            </Input>
                        </div>)}
                    </div>
                    <div className="d-flex justify-content-end m-4">
                        <button type="button" className="btn btn-light mx-4" onClick={() => toggleModal()}>Cancel</button>
                        <button type="button" className={!activateConfrim ? "btn btn-light" : "btn btn-primary"} disabled={!activateConfrim} onClick={()=>confirmHandler(selectedItemValue)}>Confirm</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ApproveItemModal;