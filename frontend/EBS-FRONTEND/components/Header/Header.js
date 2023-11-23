import { useEffect, useState } from 'react';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import UpdateUserModal from '../Modals/updateUserModal';
import ChangeUserPasswordModal from '../Modals/changePasswordModal';
import GenerateReportModal from '../Modals/generateReportModal';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const HeaderComponent = ({ page, logout }) => {
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        nID: "",
        email: "",
    })
    // const[userData,setUserD]
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
        const userData = JSON.parse(localStorage.getItem("loggedInUser"));
        setData({
            firstname: userData.firstname,
            lastname: userData.lastname,
            nID: userData.nID,
            email: userData.email
        })
        setEmail(userData.email)
    }, [])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };
    const [modalChangePasswordIsOpen, setChangePasswordModalIsOpen] = useState(false)
    const toggleChangePasswordModal = () => {
        setChangePasswordModalIsOpen(!modalChangePasswordIsOpen);
    };
    const [reportModal, setReportModal] = useState(false)
    const toggleReportModal = () => {
        setReportModal(!reportModal);
    };
    const updateHandler = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.post("http://localhost:5000/api/user/update", data, config)
            toast.success("Succesfully updated user !", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            localStorage.setItem("loggedInUser", JSON.stringify(response.data.updatedUser))
            localStorage.setItem("user", JSON.stringify(response.data.userInformation))
            setUser(JSON.parse(localStorage.getItem('user')))
            toggleModal()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <header className="border-bottom shadow font-monospace" style={{ width: "100%", backgroundColor: "#ffffff" }}>
            <div className="container pt-1">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <p className='mt-2'> {page}</p>
                    </div>
                    <UncontrolledDropdown group>
                        <i className="bi bi-person-circle mx-2" style={{ fontSize: '1.7em' }}></i>
                        <p className='mt-2'>{user.username}</p>
                        <DropdownToggle
                            caret
                            color='default'
                        />
                        <DropdownMenu className='shadow rounded-3'>
                            <DropdownItem onClick={toggleModal}>
                                <div className='d-flex flex-row'>
                                    <div className='d-flex align-items-center'>
                                        <i class="bi bi-info-circle mx-2" style={{ fontSize: '1.7em' }}></i>
                                    </div>
                                    <div className='d-flex flex-column m-0 p-0'>
                                        <p className='m-0 p-0'><strong>{user.username}</strong></p>
                                        <p className='text-muted m-0 p-0'>{email}</p>
                                    </div>
                                </div>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={toggleModal}>
                                <div className='d-flex flex-row'>
                                    <i class="bi bi-pencil-fill"></i>
                                    <p className='mx-3 my-0 py-0 text-muted'>Update profile</p>
                                </div>
                            </DropdownItem>
                            <DropdownItem onClick={toggleChangePasswordModal}>
                                <div className='d-flex flex-row'>
                                    <i class="bi bi-lock-fill"></i>
                                    <p className='mx-3 my-0 py-0 text-muted'>Change password</p>
                                </div>
                            </DropdownItem>
                            {(user.role === "RAB" || user.role === "RSB" || user.role === "RICA") && (
                                <DropdownItem onClick={toggleReportModal}>
                                    <div className='d-flex flex-row'>
                                        <i class="bi bi-pencil-fill"></i>
                                        <p className='mx-3 my-0 py-0 text-muted'>Review report</p>
                                    </div>
                                </DropdownItem>
                            )}
                            <DropdownItem
                                onClick={() => logout()}
                            >
                                <div className='d-flex flex-row'>
                                    <i class="bi bi-box-arrow-right"></i>
                                    <p className='mx-3 my-0 py-0 text-muted'>Logout</p>
                                </div>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
                <div>
                    <UpdateUserModal
                        modalIsOpen={modalIsOpen}
                        toggleModal={toggleModal}
                        data={data}
                        setData={setData}
                        updateHandler={updateHandler}
                    />
                </div>
                <div>
                    <ChangeUserPasswordModal
                        modalIsOpen={modalChangePasswordIsOpen}
                        toggleModal={toggleChangePasswordModal}
                    />
                </div>
                <div>
                    <GenerateReportModal
                        modalIsOpen={reportModal}
                        toggleModal={toggleReportModal} />
                </div>
            </div>
            <div>
                <ToastContainer />
            </div>
        </header>
    );
};

export default HeaderComponent;
