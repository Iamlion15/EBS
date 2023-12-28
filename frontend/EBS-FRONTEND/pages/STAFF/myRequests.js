import { useState, useEffect, useRef } from "react";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import axios from "axios";
import formatDateToCustomFormat from "@/helpers/dateFormatter";
import DeleteModal from "@/components/Modals/deleteModal";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UpdateItemModal from "@/components/Modals/updateItemModal";


const MyRequests = () => {
    const [data, setData] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [viewApp, setViewApp] = useState(false)
    const [viewItemUpdate, setViewItemUpdate] = useState(false)
    const [details, setDetails] = useState({})
    const [updateData, setUpdateData] = useState({
        id: "",
        ItemName: "",
        quantity: "",
        whenNeeded: "",
        itemType: "",
        purpose: "",
        fileLocation: ""
    })
    const toastId = useRef(null)
    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };
    const toggleUpdateItemModal = () => {
        setViewItemUpdate(!viewItemUpdate)
    }
    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal)
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
            console.log(response.data);
            setData(response.data)
            const pendingData = [];
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].status === "Pending") {
                    pendingData.push(response.data[i])
                }
            }
            setData(pendingData)
        } catch (error) {
            console.log(error)
        }
    }, [viewItemUpdate, deleteModal])

    const checkStatus = (ebsstatus, financestatus) => {
        if (ebsstatus === "true" && financestatus === "false") {
            return <span className="badge rounded-pill bg-primary">Under review</span>;
        } else {
            return <span className="badge rounded-pill bg-warning text-dark">Pending</span>;
        }
    };

    const switchView = (detail) => {
        setDetails(detail)
        setViewApp(true)
    }
    const showDeleteModal = (id) => {
        setDeleteId(id)
        setDeleteModal(true)
    }
    const showUpdateItem = (currentDocument) => {
        console.log("clicked");
        setUpdateData({
            id: currentDocument._id,
            ItemName: currentDocument.item.ItemName,
            quantity: currentDocument.item.quantity,
            whenNeeded: currentDocument.item.whenNeeded,
            itemType: currentDocument.item.itemType,
            purpose: currentDocument.item.purpose,
            fileLocation: currentDocument.item.fileLocation
        })
        setViewItemUpdate(true)
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
                    <p><strong> All Applications</strong></p>
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
                                        <th>SUBMITTED ON</th>
                                        <th>STATUS</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((items, index) => {
                                        return (
                                            <tr key={items._id}>
                                                <td>{index + 1}</td> {/* Display a row number */}
                                                <td>{items.item.ItemName}</td>
                                                <td>{formatDateToCustomFormat(items.item.createdAt)}</td>
                                                <td>
                                                    {checkStatus(
                                                        items.EBS_Approval.approved,
                                                        items.Finance_Approval.approved,
                                                    )}
                                                </td>
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
                                                                onClick={() => showUpdateItem(items)}
                                                            >
                                                                <div className='d-flex flex-row'>
                                                                    <i class="bi bi-box-seam"></i>
                                                                    <p className='mx-3 my-0 py-0 text-muted'>Update</p>
                                                                </div>
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                onClick={() => showDeleteModal(items._id)}
                                                            >
                                                                <div className='d-flex flex-row'>
                                                                <i class="bi bi-trash"></i>
                                                                    <p className='mx-3 my-0 py-0 text-muted'>Delete</p>
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
                        {viewItemUpdate && <UpdateItemModal
                            modalIsOpen={viewItemUpdate}
                            toggleModal={toggleUpdateItemModal}
                            data={updateData}
                            setData={setUpdateData}
                            updateHandler={updateHandler}

                        />}
                    </div>
                    {deleteModal && (
                        <DeleteModal
                            toggleModal={setDeleteModal}
                            modalIsOpen={deleteModal}
                            id={deleteId}
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
