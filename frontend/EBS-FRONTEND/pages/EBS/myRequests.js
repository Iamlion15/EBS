import { useState, useEffect, useRef } from "react";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import axios from "axios";
import formatDateToCustomFormat from "@/helpers/dateFormatter";
import ViewApplication from "./viewApplication";
import MessageModal from "@/components/Modals/MoreInformationModal";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ApproveItemModal from "@/components/Modals/ApproveItemModal";


const MyRequests = () => {
    const [data, setData] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [messageModal, setMessageModal] = useState(false)
    const [viewApp, setViewApp] = useState(false)
    const [viewItemApprove, setViewItemApprove] = useState(false)
    const [details, setDetails] = useState({})
    const [receiver,setReciever]=useState('')
    const [approveData, setApproveData] = useState({
        id: "",
        ItemName: "",
        quantity: "",
        firstname: "",
        lastname: "",
        fileLocation: ""
    })
    const [messageData,setMessageData]=useState({
        receiver:"",
        firstname:"",
        lastname:"",
        ItemName:""
    })
    const toastId = useRef(null)
    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };
    const toggleApproveItemModal = () => {
        setViewItemApprove(!viewItemApprove)
    }
    const toggleMessageModal = () => {
        setMessageModal(!messageModal)
    }
    useEffect(async () => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.get("http://localhost:4000/api/item/getall", config)
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }, [viewItemApprove, messageModal])
    const switchView = (detail) => {
        setDetails(detail)
        setViewApp(true)
    }
    const showMessageModal = (info) => {
        console.log(info);
        setMessageData({
            receiver:info.owner._id,
            firstname:info.owner.firstname,
            lastname:info.owner.lastname,
            ItemName:info.item.ItemName,
            itemId:info.item._id
        })
        setMessageModal(true)
    }
    const showApproveItem = (currentDocument) => {
        setApproveData({
            id: currentDocument._id,
            firstname: currentDocument.owner.firstname,
            lastname: currentDocument.owner.lastname,
            ItemName: currentDocument.item.ItemName,
        })
        setViewItemApprove(true)
    }
    const updateHandler = async (e) => {
        e.preventDefault();
        toastId.current = toast.info("Loading............", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: false
        })
        const formData = new FormData();
        formData.append("id", updateData.id);
        formData.append("ItemName", updateData.ItemName);
        formData.append("quantity", updateData.quantity);
        formData.append("whenNeeded", updateData.whenNeeded);
        formData.append("itemType", updateData.itemType);
        formData.append("purpose", updateData.purpose);
        formData.append("fileLocation", updateData.fileLocation)
        const config = {
            headers: {
                'Content-Type': "multipart/form-data",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.post("http://localhost:4000/api/item/update", formData, config)
            toast.update(toastId.current, { render: "Successfully sent data", type: toast.TYPE.SUCCESS, autoClose: 2000 })
            toggleUpdateItemModal()

        } catch (error) {
            console.log(error)
            toast.update(toastId.current, { render: "Failure", type: toast.TYPE.ERROR, autoClose: 2000 })
        }
    }
    

    return (
        <>
            {!viewApp && (
                <div className="mx-4 font-monospace">
                    <p><strong> All Requests</strong></p>
                    <div className="card rounded-3 shadow-sm">
                        <div className="mx-4 mt-2">
                            <div className="d-flex justify-content-end">
                                <div className="mx-2 mt-2 mb-2">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="bi bi-search"></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Search..." />
                                    </div>
                                </div>
                            </div>
                            <table className="table mt-5">
                                <thead>
                                    <tr>
                                        <th>NO.</th>
                                        <th>iTEM NAME</th>
                                        <th>STAFF NAME</th>
                                        <th>SUBMITTED ON</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((items, index) => {
                                        return (
                                            <tr key={items._id}>
                                                <td>{index + 1}</td> {/* Display a row number */}
                                                <td>{items.item.ItemName}</td>
                                                <td>{items.owner.firstname} {items.owner.lastname}</td>
                                                <td>{formatDateToCustomFormat(items.item.createdAt)}</td>
                                                <td className="d-flex justify-content-center">
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle
                                                            role="button"
                                                            size="sm"
                                                            color=""
                                                            onClick={(e) => e.preventDefault()}
                                                        >
                                                            <i class="bi bi-three-dots-vertical"></i>
                                                        </DropdownToggle>
                                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                                            <DropdownItem
                                                                onClick={() => showApproveItem(items)}
                                                            >
                                                                <div className='d-flex flex-row'>
                                                                <i class="bi bi-pencil-square"></i>
                                                                    <p className='mx-3 my-0 py-0'>Review request</p>
                                                                </div>
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                onClick={() => showMessageModal(items)}
                                                            >
                                                                <div className='d-flex flex-row'>
                                                                <i class="bi bi-chat-left-dots-fill"></i>
                                                                    <p className='mx-3 my-0 py-0 text-muted'>More information</p>
                                                                </div>
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        {viewItemApprove && <ApproveItemModal
                            modalIsOpen={viewItemApprove}
                            toggleModal={toggleApproveItemModal}
                            data={approveData}
                            setData={setApproveData}
                            updateHandler={updateHandler}

                        />}
                    </div>
                    {messageModal && (
                        <MessageModal
                            toggleModal={toggleMessageModal}
                            modalIsOpen={messageModal}
                            data={messageData}
                            ToastContainer={ToastContainer}
                        />
                    )}
                    <div>
                        <ToastContainer />
                    </div>
                </div>
            )}
            {viewApp && (
                <ViewApplication document={details}
                    setViewApp={setViewApp}
                />
            )}

        </>
    )
}

export default MyRequests;
