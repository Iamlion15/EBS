import { useState, useEffect, useRef } from "react";
import axios from "axios";
import formatDateToCustomFormat from "@/helpers/dateFormatter";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DetailedInformation from "./DetailedInformation";
import RejectedRequestPDF from "@/helpers/rejectedRequestPDF";
import ApprovedRequestPDF from "@/helpers/approvedRequestPDF";

const STAFFReviewedRequest = () => {
    const [data, setData] = useState([])
    const [showDetailedInfo, setShowDetailedInfo] = useState(false)
    const [info, setInfo] = useState();
    const [search, setSearch] = useState("")
    const toggleDetailedInfo = () => {
        setShowDetailedInfo(!showDetailedInfo)
    }
    const showInfoWindow = (details) => {
        console.log(details);
        setInfo(details);
        setShowDetailedInfo(true)
    }
    const printRejectionRequest = (e) => {
        e.preventDefault()
        console.log(info);
        const names = info.owner.firstname + " " + info.owner.lastname
        if (info.status === "Approved") {
            ApprovedRequestPDF(info, names)
        }
        else {
            RejectedRequestPDF(info, names)
        }

    }
    useEffect(async () => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.get("http://localhost:4000/api/item/getstatusitems", config)
            console.log(response.data);
            setData(response.data)
            const pendingData = [];
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].status === "Rejected" || response.data[i].status === "Approved") {
                    pendingData.push(response.data[i])
                }
            }
            setData(pendingData)
        } catch (error) {
            console.log(error)
        }
    }, [])
    const filteredData = data.filter(searchedItem => searchedItem.item.ItemName.toLowerCase().startsWith(search.toLowerCase()));
    return (
        <>
            <div className="mx-4 font-monospace">
                <p><strong> Finance past reviewed application status</strong></p>
                <div className="card rounded-3 shadow-sm">
                    {!showDetailedInfo ? (<div className="mx-4 mt-2">
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
                        <table className="table table-hover mt-5">
                            <thead>
                                <tr className="table-primary">
                                    <th>NO.</th>
                                    <th>iTEM NAME</th>
                                    <th>SUBMITTED ON</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((items, index) => {
                                    return (
                                        <tr key={items._id} style={{ cursor: "pointer" }}
                                            onClick={() => showInfoWindow(items)}
                                        >
                                            <td>{index + 1}</td>
                                            <td>{items.item.ItemName}</td>
                                            <td>{formatDateToCustomFormat(items.item.createdAt)}</td>
                                            <td>
                                                {items.status === "Approved" ? (<span className="badge rounded-pill bg-success">Complete</span>)
                                                    : (<span className="badge rounded-pill bg-danger">Rejected</span>)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>) : (
                        <DetailedInformation data={info} show={showDetailedInfo} toggleShow={toggleDetailedInfo} />
                    )}
                    {showDetailedInfo && <div className="card-footer">
                        <div className="row">
                            <div className="col">
                                <button className="btn btn-outline-primary" onClick={() => toggleDetailedInfo()}>Go back</button>
                            </div>
                            <div className="col">
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-outline-primary" onClick={printRejectionRequest}>Generate Report</button>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
                <div>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default STAFFReviewedRequest;
