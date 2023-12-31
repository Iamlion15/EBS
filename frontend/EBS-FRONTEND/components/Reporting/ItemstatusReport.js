import { useState, useEffect } from "react";
import { Modal, ModalHeader } from "reactstrap";
import GeneratePDF from "@/helpers/pdf";
import axios from "axios";
import FinanceGeneratePDF from "@/helpers/financePDF";
import formatDateToCustomFormat from "@/helpers/dateFormatter";
import RejectedRequestPDF from "@/helpers/rejectedRequestPDF";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";


const ItemReportStatus = ({ toggleModal }) => {
    const [dateRange, setDateRange] = useState({
        startDate: "",
        endDate: "",
        role: ""
    })
    const [printData, setPrintData] = useState({
        role: "",
        username: "",
        title: "",
        startDate: "",
        endDate: ""
    })
    const [document, setDocument] = useState([])
    const [activateDateChooser, setActivateDateChooser] = useState(false)
    const [category, setCategory] = useState("")
    const handleSelectChange = (e) => {
        const cat = e.target.value;
        setCategory(cat)
        if (cat === "Pending" || cat === "Reviewed" || cat === "Rejected") {
            setActivateDateChooser(true)
        }
        else {
            // setDateRange({startDate:""})
            setActivateDateChooser(false)
            console.log("date", !dateRange.startDate);
            console.log("activate", !activateDateChooser);
        }
    }
    const findDocuments = async () => {
        const userRole = JSON.parse(localStorage.getItem("loggedInUser")).role
        if (category === "Pending") {
            const config = {
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': JSON.parse(localStorage.getItem("token"))
                }
            }
            try {
                if (userRole === "EBS") {
                    const response = await axios.post("http://localhost:4000/api/report/ebs/pendingreport", dateRange, config);
                    console.log(response.data)
                    if (response.data.items.length === 0) {
                        toast.success("There is 0 item pending in this period !", {
                            position: toast.POSITION.TOP_RIGHT, autoClose: 1000
                        });
                    }
                    else {
                        GeneratePDF(response.data.items, printData)
                    }
                }
                else {
                    if (userRole === "FINANCE") {
                        const response = await axios.post("http://localhost:4000/api/report/finance/pendingreport", dateRange, config);
                        if (response.data.items.length === 0) {
                            toast.success("There is 0 item pending in this period !", {
                                position: toast.POSITION.TOP_RIGHT, autoClose: 1000
                            });
                        }
                        else {
                            GeneratePDF(response.data.items, printData)
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        else if (category === "Reviewed") {
            const config = {
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': JSON.parse(localStorage.getItem("token"))
                }
            }
            try {
                if (userRole === "EBS") {
                    const response = await axios.post("http://localhost:4000/api/report/ebs/approvedreport", dateRange, config);
                    console.log(response.data)
                    if (response.data.items.length === 0) {
                        toast.success("There is 0 item reviewed in this period !", {
                            position: toast.POSITION.TOP_RIGHT, autoClose: 1000
                        });
                    }
                    else {
                        GeneratePDF(response.data.items, printData)
                    }
                }
                else {
                    if (userRole === "FINANCE") {
                        const response = await axios.post("http://localhost:4000/api/report/finance/approvedreport", dateRange, config);
                        if (response.data.items.length === 0) {
                            toast.success("There is 0 item reviewed in this period !", {
                                position: toast.POSITION.TOP_RIGHT, autoClose: 1000
                            });
                        }
                        else {
                            FinanceGeneratePDF(response.data.items, printData)
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        else {
            if (category === "Rejected") {
                const config = {
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': JSON.parse(localStorage.getItem("token"))
                    }
                }
                try {
                    if (userRole === "EBS") {
                        const response = await axios.post("http://localhost:4000/api/report/ebs/rejectedreport", dateRange, config);
                        console.log(response.data)
                        if (response.data.items.length === 0) {
                            toast.success("There is 0 item reviewed in this period !", {
                                position: toast.POSITION.TOP_RIGHT, autoClose: 1000
                            });
                        }
                        else {
                            RejectedRequestPDF(response.data.items, printData)
                        }
                    }
                    else {
                        if (userRole === "FINANCE") {
                            const response = await axios.post("http://localhost:4000/api/report/finance/rejectedreport", dateRange, config);
                            if (response.data.items.length === 0) {
                                toast.success("There is 0 item reviewed in this period !", {
                                    position: toast.POSITION.TOP_RIGHT, autoClose: 1000
                                });
                            }
                            else {
                                RejectedRequestPDF(response.data.items, printData)
                            }
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
    useEffect(() => {
        const usernam = JSON.parse(localStorage.getItem("user")).username
        const userRole = JSON.parse(localStorage.getItem("loggedInUser")).role
        let title;
        if (category === "Pending") {
            title = "PERIOD PENDING ITEM REPORT"
        }
        else if (category === "Reviewed") {
            title = "PERIOD APPROVED ITEM REPORT"
        }
        else {
            title = "PERIOD REJECTED ITEM REPORT"
        }
        setPrintData({
            role: userRole,
            username: usernam,
            title: title,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate
        })
    }, [dateRange.endDate])

    useEffect(async () => {
        setDateRange({ startDate: "", endDate: "" })
    }, [])
    return (
        <div>
            <div className="d-flex flex-column">
                <div className="mx-5 px-5 ">
                    <p>choose category</p>
                    <select className="form-select form-select-sm" onChange={handleSelectChange}>
                        <option > Choose</option>
                        <option value="Pending" selected={category === "Pending"}>Pending</option>
                        <option value="Reviewed" selected={category === "Reviewed"}>Approved</option>
                        <option value="Rejected" selected={category === "Rejected"}>Rejected</option>
                    </select>
                </div>
                <div className="row">
                    <div className="col mx-2 mt-3">
                        <small className="d-block text-uppercase font-weight-bold mb-3">
                            Start Date
                        </small>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Date Picker Here"
                            value={dateRange.startDate}
                            onChange={(e) =>
                                setDateRange({ ...dateRange, startDate: e.target.value })
                            }
                            disabled={!activateDateChooser}
                        />
                    </div>
                    <div className="col mt-3 mx-2">
                        <small className="d-block text-uppercase font-weight-bold mb-3">
                            End Date
                        </small>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Date Picker Here"
                            value={dateRange.endDate}
                            onChange={(e) =>
                                setDateRange({ ...dateRange, endDate: e.target.value })
                            }
                            min={dateRange.startDate} // Set the minimum date based on Start Date
                            disabled={!dateRange.startDate} // Disable if Start Date is not filled
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className=" d-flex justify-content-end m-4">
                        <button type="button" className="btn btn-light mx-4" onClick={() => toggleModal()}>Cancel</button>
                        <button type="button" className={!dateRange.endDate ? "btn btn-light" : "btn btn-danger"} disabled={!dateRange.endDate} onClick={findDocuments}>Generate</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ItemReportStatus;