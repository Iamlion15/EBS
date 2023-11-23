import { useState, } from "react";
import { Modal, ModalFooter } from "reactstrap";
import formatDateToCustomFormat from "@/helpers/dateFormatter";



const UpdateItemModal = ({ modalIsOpen, toggleModal, data, setData, updateHandler }) => {
    const [showUpload, setShowUpload] = useState(false);
    return (
        <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center font-monospace" size='lg'>
            <div>
                <div className="m-3">
                    <h3 className="text-primary">Edit Item</h3>
                </div>
                <form className="m-4">
                    <div className="row">
                        <div className="col">
                            <div className="form-floating">
                                <input type="text"
                                    className="form-control"
                                    id="fname"
                                    value={data.ItemName}
                                    onChange={(e) => setData({
                                        ...data,
                                        ItemName: e.target.value

                                    })}
                                />
                                <label htmlFor="cname">Item Name</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating">
                                <input type="number"
                                    className="form-control"
                                    id="qty"
                                    value={data.quantity}
                                    onChange={(e) => setData({
                                        ...data,
                                        quantity: e.target.value
                                    })}
                                />
                                <label htmlFor="qty">Item quantity</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <div className="form-floating">
                                <input type="text"
                                    className="form-control"
                                    id="when"
                                    value={formatDateToCustomFormat(data.whenNeeded)}
                                    onChange={(e) => setData({
                                        ...data,
                                        whenNeeded: e.target.value
                                    })}
                                    disabled
                                />
                                <label htmlFor="phone">Date when needed</label>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                {showUpload && (<div className="input-group">
                                    <input type="file" className="form-control" id="upload"
                                        onChange={(e) => setData({
                                            ...data,
                                            fileLocation: e.target.files[0]
                                        })} />
                                </div>)}
                                {!showUpload && (
                                    <div className="d-flex flex-row" >
                                        <i class="bi bi-filetype-pdf mx-3"></i>
                                        <p className="text-secondary mx-4" style={{ textDecoration: 'underline' }} ><strong>Supporting document</strong></p>
                                        <button className="btn btn-sm btn-warning" onClick={() => setShowUpload(true)}>remove</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                    <div className="col-6">
                            <div class="form-floating">
                                <select className="form-select" value={data.itemType} onChange={(e) => setData({ ...data, itemType: e.target.value })}>
                                    <option value="ELECTRONICS" selected={data.itemType === "ELECTRONIC"}>ELECTRONICS</option>
                                    <option value="OFFICE EQUIPMENT" selected={data.itemType === "OFFICE EQUIPMENT"}>OFFICE EQUIPMENT</option>
                                    <option value="COMPUTER FACILITY" selected={data.itemType === "COMPUTER FACILITY"}>COMPUTER FACILITY</option>
                                </select>
                                <label for="choose">ITEM CATEGORY</label>
                            </div>
                        </div>
                       
                    </div>
                    <ModalFooter className="m-4">
                        <button type="button" class="btn btn-outline-danger" onClick={() => toggleModal()}>Cancel</button>
                        <button type="button" class="btn btn-primary" onClick={updateHandler}>Update item</button>
                    </ModalFooter>
                </form>
            </div>
        </Modal>
    )
}



export default UpdateItemModal;