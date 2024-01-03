import { useState, useEffect } from "react";
import axios from "axios";
import {  Input } from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import FinanceInvoiceGeneratePDF from "@/helpers/FinanceInvoiceReportPDF";

const VendorReport = ({ toggleModal }) => {

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
                toast.success("There is 0 vendor !", {
                    position: toast.POSITION.TOP_RIGHT, autoClose: 1000
                });
                setShowCount(true)
            }
            else {
                setShowCount(false)
                FinanceInvoiceGeneratePDF(response.data, dateRange)
            }
        } catch (error) {
            console.log(error);
            toast.warn("Unable to fetch !", {
                position: toast.POSITION.TOP_RIGHT, autoClose: 1000
            });
        }
    }
    useEffect(()=>{
        
    })
    return (
        <div>
            <div className="d-flex flex-column">
                <div className="my-2">
                    <Input
                        type="select"
                        bsSize="md"
                        className="selectpicker"
                        value={selectedItemValue}
                        onChange={handleSelectVendorItemChange}
                    >
                        <option value="" disabled>Select vendor</option>
                        {vendorItems.map((vendoritem) => (
                            <option key={vendoritem._id} value={vendoritem._id}>
                                {vendoritem.itemName} -- {vendoritem.itemPrice} RWF
                            </option>
                        ))}
                    </Input>
                </div>
            </div>
            <div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default VendorReport;