import { useState, useEffect, useRef } from "react";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import axios from "axios";
import formatDateToCustomFormat from "@/helpers/dateFormatter";
import MessageModal from "@/components/Modals/MoreInformationModal";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ApproveItemModal from "@/components/Modals/EBSApproveItemModal";


const MyRequests = () => {
    const [data, setData] = useState([])
    const [messageModal, setMessageModal] = useState(false)
    const [viewApp, setViewApp] = useState(false)
    const [viewItemApprove, setViewItemApprove] = useState(false)
    const [details, setDetails] = useState({})
    const [search, setSearch] = useState("")
    const [approveData, setApproveData] = useState({
        id: "",
        ItemName: "",
        quantity: "",
        firstname: "",
        lastname: "",
        fileLocation: ""
    })
    const [messageData, setMessageData] = useState({
        receiver: "",
        firstname: "",
        lastname: "",
        ItemName: ""
    })
    const toastId = useRef(null)
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
            const response = await axios.get("http://localhost:4000/api/item/getebsitem", config)
            const ebsdata = [];
            console.log(response.data);
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].EBS_Approval.approved === false && response.data[i].status === "Pending") {
                    ebsdata.push(response.data[i])
                }
            }
            setData(ebsdata)
        } catch (error) {
            console.log(error)
        }
    }, [viewItemApprove, messageModal])
    const showMessageModal = (info) => {
        console.log(info);
        setMessageData({
            receiver: info.owner._id,
            firstname: info.owner.firstname,
            lastname: info.owner.lastname,
            ItemName: info.item.ItemName,
            itemId: info._id
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
    const confirmHandler = async (selectedItemValue) => {
        const confirmData = {
            id: approveData.id,
            reviewer: JSON.parse(localStorage.getItem("loggedInUser"))
        }
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
            const response = await axios.post(`http://localhost:4000/api/item/ebsapprove/${selectedItemValue}`, confirmData, config)
            toast.update(toastId.current, { render: "Successfully sent data", type: toast.TYPE.SUCCESS, autoClose: 2000 })
            toggleApproveItemModal()

        } catch (error) {
            console.log(error)
            toast.update(toastId.current, { render: "Failure", type: toast.TYPE.ERROR, autoClose: 2000 })
        }
    }
    const filteredData = data.filter(searchedItem => searchedItem.item.ItemName.toLowerCase().startsWith(search.toLowerCase()));
    return (
        <>
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
                                    <input type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="form-control" placeholder="Search..." />
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
                                {filteredData.map((items, index) => {
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
                        confirmHandler={confirmHandler}

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

        </>
    )
}

export default MyRequests;
