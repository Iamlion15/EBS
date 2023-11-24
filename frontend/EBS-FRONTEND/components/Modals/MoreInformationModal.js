import { useState, useEffect, useRef } from "react";
import { Modal, ModalHeader } from "reactstrap";
import axios from "axios";


const MessageModal = ({ modalIsOpen, toggleModal, data }) => {
    const [activateConfrim, setActivateConfirm] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState('')
    const [isNew, setIsNew] = useState(true)
    const [chats, setChats] = useState();
    const [message, setMessage] = useState({
        content: "",
        receiver: data.receiver,
        itemId: data.itemId
    })
    const tableRef = useRef(null);
    const handleInput = (e) => {
        const input = e.target.value
        setMessage({
            ...message, content: input, receiver: data.receiver
        })
        if (input !== "") {
            setActivateConfirm(true)
        }
        else {
            setActivateConfirm(false)
        }
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        console.log(message);
        try {
            const response = await axios.post("http://localhost:4000/api/message/send", message, config)
            setMessage({
                ...message, content: "",
            })
            fetchChatData();
        } catch (error) {
            console.log(error)
        }
    }
    const fetchChatData = async () => {
        const msgInformation = {
            receiverId: data.receiver
        }
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.post("http://localhost:4000/api/message/getchat", msgInformation, config)
            setChats(response.data)
            if (response.data === "") {
                setIsNew(false)
            }
            if (response.data && response.data.chat && response.data.chat.messages.length > 0) {
                const userWhoLoggedIn=JSON.parse(localStorage.getItem('loggedInUser'))._id
                const lastMessage = response.data.chat.messages[response.data.chat.messages.length - 1];
                // Check if the last message is not marked as read
                if (!lastMessage.read.isRead && lastMessage.sender.userId !== userWhoLoggedIn) {
                    console.log("here");
                    const markReadConfig = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': JSON.parse(localStorage.getItem('token')),
                        },
                    };
                    try {
                        // Mark the message as read
                        axios.put(`http://localhost:4000/api/message/markasread/${lastMessage.messageId}`, {}, markReadConfig);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        setLoggedInUserId(JSON.parse(localStorage.getItem('loggedInUser'))._id);
        fetchChatData()
    }, []);

    useEffect(() => {
        if (tableRef.current) {
            const table = tableRef.current; //accessing the table DOM
            const lastRows = table.querySelectorAll('tr:last-child'); //selecting the last element of a row in a table
            //if the last row is present scroll down to that view
            if (lastRows.length > 0) {
                lastRows[lastRows.length - 1].scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }
    })
    return (
        <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center font-monospace" size='md'>
            <div>
                <ModalHeader>
                    <div className="m-2">
                        <h4 className="text-primary">Ask for more information</h4>
                    </div>
                </ModalHeader>
                <div>
                    <div className="m-3">
                        {!isNew && (<span className="mb-2">This message will be sent to : <strong> {data.firstname} {data.lastname}</strong> 's document,</span>)}
                        <div className="mt-2">
                            {isNew && chats && chats.chat && (
                                <div className="bg-light" style={{ maxHeight: '300px', overflowY: 'auto' }} ref={tableRef}>
                                    <table className="table table-borderless" style={{ tableLayout: 'fixed' }} >
                                        <tbody>
                                            {chats.chat.messages.map((chat, index) => (
                                                <tr key={index}>
                                                    {chat.sender.userId === loggedInUserId && (
                                                        <>
                                                            <td></td>
                                                            <td
                                                                style={{
                                                                    textAlign: 'left',
                                                                    width: '50%', // Set your desired max width
                                                                    whiteSpace: 'pre-wrap',
                                                                    overflowWrap: 'break-word', // Add this line
                                                                }}
                                                            >
                                                                <p className="rounded-3 shadow-sm mx-2" style={{ backgroundColor: "#4c97ff" }}><span className="mx-2">{chat.content}</span></p>
                                                            </td>
                                                        </>
                                                    )}
                                                    {chat.sender.userId !== loggedInUserId && (
                                                        <td
                                                            colSpan={2}
                                                            style={{
                                                                textAlign: 'left',
                                                                width: '50%', // Set your desired max width
                                                                whiteSpace: 'pre-wrap',
                                                                overflowWrap: 'break-word', // Add this line
                                                            }}
                                                        >
                                                            <p className="" style={{ fontSize: '1em', fontWeight: 'bold' }}>{chat.content}</p>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            )}
                            <div className="col-6 mt-3">
                                <p className="m-0 p-0" style={{ fontSize: '0.8em', fontWeight: 'bold' }}><small>Type in below your message</small></p>
                                <div className="form-floating">
                                    <textarea
                                        className="form-control"
                                        placeholder="The purpose of requesting this item"
                                        style={{ height: "50px", width: "400px" }}
                                        value={message.content}
                                        required
                                        onChange={handleInput}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end m-4">
                        <button type="button" className="btn btn-light mx-4" onClick={() => toggleModal()}>Cancel</button>
                        <button type="button" className={!activateConfrim ? "btn btn-light" : "btn btn-primary"} disabled={!activateConfrim} onClick={handleSendMessage}><span className="mx-2">Send</span><i class="bi bi-send-fill"></i></button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default MessageModal;