import { useState, useEffect, useRef } from "react";
import axios from "axios";
import formatDateToCustomFormat from "@/helpers/dateFormatter";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ApprovedRequests = () => {
    const [data, setData] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const toastId = useRef(null)
    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };
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
                if (response.data[i].status === "Approved") {
                    pendingData.push(response.data[i])
                }
            }
            setData(pendingData)
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
                <div className="mx-4 font-monospace">
                    <p><strong> Approved Applications</strong></p>
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
                                                    <span className="badge rounded-pill bg-success">Complete</span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <ToastContainer />
                    </div>
                </div>
        </>
    )
}

export default ApprovedRequests;
