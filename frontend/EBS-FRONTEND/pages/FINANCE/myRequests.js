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
import ApproveItemModal from "@/components/Modals/ApproveItemModal";


const MyRequests = () => {
    const [data, setData] = useState([])
    const [messageModal, setMessageModal] = useState(false)
    const [viewApp, setViewApp] = useState(false)
    const [viewItemApprove, setViewItemApprove] = useState(false)
    const [details, setDetails] = useState({})
    const [approveData, setApproveData] = useState({
        id: "",
        ItemName: "",
        quantity: "",
        firstname: "",
        lastname: "",
        reviewerFirstName:"",
        reviewerLastName:"",
        itemAssigned:"",
        vendorName:"",
        price:"",
    })
    const [messageData,setMessageData]=useState({
        receiver:"",
        firstname:"",
        lastname:"",
        ItemName:""
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
            const response = await axios.get("http://localhost:4000/api/item/financegetall", config)
            const financedata=[];
            console.log(response.data);
            for(let i=0;i<response.data.length;i++){
                if(response.data[i].EBS_Approval.approved===true && response.data[i].Finance_Approval.approved===false){
                    financedata.push(response.data[i])
                }
            }
            setData(financedata)
        } catch (error) {
            console.log(error)
        }
    }, [viewItemApprove, messageModal])
    const showMessageModal = (info) => {
        console.log(info);
        setMessageData({
            receiver:info.reviewer,
            firstname:info.owner.firstname,
            lastname:info.owner.lastname,
            ItemName:info.item.ItemName,
            itemId:info._id
        })
        setMessageModal(true)
    }
    const showApproveItem = (requestedItem) => {
        setApproveData({
            id: requestedItem._id,
            ownerid:requestedItem.owner._id,
            firstname: requestedItem.owner.firstname,
            lastname: requestedItem.owner.lastname,
            ItemName: requestedItem.item.ItemName,
            itemid:requestedItem.item._id,
            reviewerid:requestedItem.reviewer._id,
            reviewerFirstName:requestedItem.reviewer.firstname,
            reviewerLastName:requestedItem.reviewer.lastname,
            vendoritemid:requestedItem.vendoritem._id,
            itemAssigned:requestedItem.vendoritem.itemName,
            price:requestedItem.vendoritem.itemPrice,
            vendorPhone:requestedItem.vendoritem.owner.phone,
            vendorEmail:requestedItem.vendoritem.owner.email,
        })
        setViewItemApprove(true)
    }
    const confirmHandler = async (approveData) => {
        const confirmData={
            id:approveData.id,
            reviewer:"FINANCE"
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
            const response = await axios.post('http://localhost:4000/api/item/approve',confirmData, config)
            toast.update(toastId.current, { render: "Successfully sent data", type: toast.TYPE.SUCCESS, autoClose: 2000 })
            toggleApproveItemModal()

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
