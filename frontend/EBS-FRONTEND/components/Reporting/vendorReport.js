import { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import FinanceInvoiceGeneratePDF from "@/helpers/FinanceInvoiceReportPDF";
import VendorReportPDF from "@/helpers/vendorReportPDF";
import VendorItemReportPDF from "@/helpers/vendorItemReportPDF";

const VendorReport = ({ toggleModal }) => {
    const [vendors, setVendors] = useState([]);
    const [vendoritems, setVendorItems] = useState([])
    const [selectedVendor, setSelectedVendor] = useState(null);

    const handleSelectVendorChange = (selectedOption) => {
        setSelectedVendor(selectedOption);
    };

    const generateReport = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        };

        try {
            const response = await axios.post("http://localhost:4000/api/report/finance/invoicereport", dateRange, config);
            console.log(response.data);

            if (response.data.length === 0) {
                toast.success("There are no vendors!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000
                });
                setShowCount(true);
            } else {
                setShowCount(false);
                FinanceInvoiceGeneratePDF(response.data, dateRange);
            }
        } catch (error) {
            console.log(error);
            toast.warn("Unable to fetch!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000
            });
        }
    };
    const generateAllVendorReport = (e) => {
        e.preventDefault()
        if (vendors.length === 0) {
            toast.success("There are no vendors!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000
            });
        }
        else {
            VendorReportPDF(vendors)
        }
    }
    const GenerateVendorItemReport = async (e) => {
        e.preventDefault()
        console.log(selectedVendor);
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.get(`http://localhost:4000/api/vendor/vendoritems/${selectedVendor.value}`, config)
            setVendorItems(response.data)
            console.log(response.data);
            if (response.data.length === 0) {
                toast.success("There are no vendors!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000
                });
            }
            else {
                VendorItemReportPDF(response.data,selectedVendor.label)
            }

        } catch (error) {
            console.log(error);
            toast.warn("Failed to fetch!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000
            });
        }
    }

    useEffect(async () => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        };

        try {
            const response = await axios.get("http://localhost:4000/api/vendor/vendors", config);
            setVendors(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-6">
                    <label>Select Vendor:</label>
                    <Select
                        value={selectedVendor}
                        onChange={handleSelectVendorChange}
                        options={vendors.map((vendor) => ({
                            label: `${vendor.firstname}  ${vendor.lastname}`,
                            value: vendor._id
                        }))}
                    />
                </div>
                <div className="col-6">
                    <button className="btn btn-outline-primary btn-sm mt-2" onClick={generateAllVendorReport}>Generate all vendor Report</button>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-6">
                    <button className="btn btn-primary" onClick={GenerateVendorItemReport}>Generate Report</button>
                </div>
            </div>

            <div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default VendorReport;
