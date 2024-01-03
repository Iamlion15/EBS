import { useState, useEffect } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import FinanceInvoiceGeneratePDF from "@/helpers/FinanceInvoiceReportPDF";

const InvoiceReport = () => {
    const [dateRange, setDateRange] = useState({
        startDate: "",
        endDate: "",
    })

    const [showCount, setShowCount] = useState();
    const generateReport = async (e) => {
        e.preventDefault()
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.post("http://localhost:4000/api/report/finance/invoicereport", dateRange, config)
            console.log(response.data);
            if (response.data.length === 0) {
                setShowCount(true)
            }
            else {
                setShowCount(false)
                FinanceInvoiceGeneratePDF(response.data,dateRange)
            }
        } catch (error) {
            console.log(error);
            toast.warn("Unable to fetch !", {
                position: toast.POSITION.TOP_RIGHT, autoClose: 1000
            });
        }
    }
    return (
        <div>
            <div className="d-flex flex-column">
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
                            min={dateRange.startDate}
                            disabled={!dateRange.startDate}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                {showCount && <div className="col">
                    <p className="text-primary">Count : </p><span className="text-dark">0</span>
                </div>}
                <div className="col">
                    <div className=" d-flex justify-content-end m-4">
                        <button type="button" className="btn btn-light mx-4" onClick={() => toggleModal()}>Cancel</button>
                        <button type="button" className={!dateRange.endDate ? "btn btn-light" : "btn btn-danger"} disabled={!dateRange.endDate} onClick={generateReport}>Generate</button>
                    </div>
                </div>
            </div>
            <div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default InvoiceReport;