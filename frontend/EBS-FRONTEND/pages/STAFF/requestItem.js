import { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RequestItem = () => {
    const [data, setData] = useState({
        ItemName: "",
        quantity: "",
        whenNeeded: "",
        itemType: "",
        purpose: "",
        file: ""
    });
    const toastId = useRef(null)
    const linearGradientBackground = {
        background: 'linear-gradient(195deg, #49a3f1, #0057A3)',
        borderColor: 'linear-gradient(195deg, #49a3f1, #0057A3)',
        width: "100%"
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        toastId.current = toast.info("Loading............", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: false
        })
        const formdata = new FormData();
        formdata.append('ItemName', data.ItemName)
        formdata.append('whenNeeded', data.whenNeeded);
        formdata.append('quantity', data.quantity);
        formdata.append('itemType', data.itemType);
        formdata.append('purpose', data.purpose)
        formdata.append('file', data.file)
        const config = {
            headers: {
                'Content-Type': "multipart/form-data",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.post("http://localhost:4000/api/item/save", formdata, config)
            toast.update(toastId.current, { render: "Successfully sent data", type: toast.TYPE.SUCCESS, autoClose: 2000 })

        } catch (error) {
            console.log(error)
            toast.update(toastId.current, { render: "Failure", type: toast.TYPE.ERROR, autoClose: 2000 })
        }
    }

    return (
        <>
            <div className="row font-monospace shadow-lg rounded-3 border-4" style={{backgroundColor:"#ffffff"}}>
                <div className="col-5 mx-3 mt-3">
                    {/* Producer Details */}
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-center">
                            <h3 className="lead">Item details</h3>
                        </div>
                        <hr />
                        <form className="mt-3">
                            <div className="form-group">
                                <label htmlFor="itemName">ITEM NAME</label>
                                <input
                                    type="text"
                                    className="form-control my-3"
                                    id="itemName"
                                    placeholder="Enter name of the item"
                                    value={data.ItemName}
                                    required
                                    onChange={(e) => setData({ ...data, ItemName: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="itemType">ITEM TYPE</label>
                                <select className="form-select" value={data.itemType} onChange={(e) => setData({ ...data, itemType: e.target.value })}>
                                    <option>Choose</option>
                                    <option value="ELECTRONICS">ELECTRONICS</option>
                                    <option value="OFFICE EQUIPMENT">OFFICE EQUIPMENT</option>
                                    <option value="COMPUTER FACILITY">COMPUTER FACILITY</option>
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="whenNeeded">WHEN NEEDED</label>
                                <input
                                    type="date"
                                    className="form-control my-3"
                                    id="whenNeeded"
                                    placeholder="time when the item will be needed"
                                    value={data.whenNeeded}
                                    required
                                    onChange={(e) => setData({ ...data, whenNeeded: e.target.value })}
                                />
                            </div>
                            <div className='mt-auto mb-3'>
                                <button className='btn text-white' style={linearGradientBackground} onClick={handleSubmit}>
                                    <strong className="mx-2">REQUEST ITEM</strong>
                                    <i class="bi bi-plus-circle" style={{ fontSize: '1.5em', fontWeight: 'bold' }}></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-5">
                    {/* Sample Information */}
                    <div className="d-flex flex-column mt-3">
                        <div className="d-flex justify-content-center">
                            <h3 className="lead">Purpose of the request</h3>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-6 mt-3">
                                <div className="form-floating">
                                    <textarea
                                        className="form-control"
                                        placeholder="The purpose of requesting this item"
                                        id="purpose"
                                        style={{ height: "100px",width:"400px" }}
                                        value={data.purpose}
                                        required
                                        onChange={(e) => setData({ ...data, purpose: e.target.value })}
                                    ></textarea>

                                    <label for="purpose">Purpose of the request</label>
                                </div>
                            </div>
                            <div className="col-6">
                                {/* Additional content for the other col-6 */}
                                {/* You can add more input fields or content here */}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nitem">Quantity</label>
                            <input
                                type="number"
                                className="form-control my-3"
                                id="nsitem"
                                placeholder="Total number of samples"
                                value={data.quantity}
                                required
                                onChange={(e) => setData({ ...data, quantity: e.target.value })}
                            />
                        </div>
                        <div className="input-group mb-3 my-3">
                            <input type="file" className="form-control" id="upload" onChange={(e) => setData({ ...data, file: e.target.files[0] })} />
                            <label className="input-group-text" htmlFor="upload">Upload</label>
                        </div>
                    </div>
                </div>
                <div>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default RequestItem;
