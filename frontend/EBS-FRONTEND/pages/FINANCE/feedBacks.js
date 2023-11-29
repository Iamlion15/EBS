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

const Feedback = () => {
    const [data, setData] = useState([])
    const [loggedInUserId, setLoggedInUserId] = useState('')
    const [messageModal, setMessageModal] = useState(false)
    const [messageData, setMessageData] = useState({
        receiver: "",
        firstname: "",
        lastname: "",
        ItemName: ""
    })
    const toggleMessageModal = () => {
        setMessageModal(!messageModal)
    }
    const showMessageModal = (info) => {
        console.log(info);
        setMessageData({
            receiver: info.itemrequest.owner._id,
            firstname: info.itemrequest.owner.firstname,
            lastname: info.itemrequest.owner.lastname,
            ItemName: info.itemrequest.item.ItemName,
        })
        setMessageModal(true)
    }
    useEffect(async () => {
        setLoggedInUserId(JSON.parse(localStorage.getItem('loggedInUser'))._id);
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.get("http://localhost:4000/api/message/getmessages", config)
            console.log(response.data);
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }, [messageModal])
    return (
        <>
            <div className="mx-4 font-monospace">
                <p><strong> All message Feedbacks</strong></p>
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
                                    <th>CONVERSATION STARTED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((convo, index) => {
                                    return (
                                        <tr key={convo._id} className={`${!convo.message[convo.message.length - 1].Read.isRead && convo.message[convo.message.length - 1].sender._id !== loggedInUserId? 'table-info': ''}`}>
                                            <td>{index + 1}</td> {/* Display a row number */}
                                            <td>{convo.itemrequest.item.ItemName}</td>
                                            <td>{convo.itemrequest.owner.firstname} {convo.itemrequest.owner.lastname}</td>
                                            <td>{formatDateToCustomFormat(convo.itemrequest.item.createdAt)}</td>
                                            <td>{formatDateToCustomFormat(convo.createdAt)}</td>
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
                                                            onClick={() => showMessageModal(convo)}
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
                    {messageModal && (
                        <MessageModal
                            toggleModal={toggleMessageModal}
                            modalIsOpen={messageModal}
                            data={messageData}
                            ToastContainer={ToastContainer}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default Feedback