import { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProgressCard from "@/components/dashboardComponent/progressCard";
import AddVendor from "@/components/vendorComponents/addVendor";
import AddVendorItem from "@/components/vendorComponents/addVendorItems";
import PaymentMethod from "@/components/vendorComponents/paymentMethod";

const Vendors = () => {
    const [step, setStep] = useState(1);
    const toastId = useRef(null)
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: ""
    });
    const [items, setItems] = useState([{
        itemName: "", itemPrice: "", category: "ELECTRONICS", properties: []
    }]);
    const [property, setProperty] = useState([
        { title: "", value: "" }
    ]);
    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSaveVendor=async(e)=>{
        e.preventDefault()
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
            console.log("items",items);
            console.log("data",data)
            const [result1, result2] = await Promise.all([await axios.post("http://localhost:4000/api/vendor/save", data, config),
            axios.post("http://localhost:4000/api/vendor/save/vendoritems", items, config)])
            toast.update(toastId.current, { render: "Successfully sent data", type: toast.TYPE.SUCCESS, autoClose: 2000 })
        } catch (error) {
            console.log(error)
            toast.update(toastId.current, { render: "Failure", type: toast.TYPE.ERROR, autoClose: 2000 })
        }
    }

    return (
        <>
            <div className="font-monospace shadow-lg rounded-3 border-4" style={{ backgroundColor: "#ffffff" }}>
                <div className="row m-3">
                    <div className="d-flex justify-align-align-content-around">
                        <ProgressCard color="#a4d5f7" elevate={step === 1 ? "shadow" : ""} message="Vendor info" icon="bi-info-circle-fill" bgcolor={step === 1 ? "#00bf9a" : "#fafafa"} />
                        <ProgressCard color="#a4d5f7" elevate={step === 2 ? "shadow" : ""} message="Stock info" icon="bi-box2-fill" bgcolor={step === 2 ? "#00bf9a" : "#fafafa"} />
                        <ProgressCard color="#a4d5f7" elevate={step === 3 ? "shadow" : ""} message="Payment info" icon="bi-credit-card-2-front-fill" bgcolor={step === 3 ? "#00bf9a" : "#fafafa"} />
                    </div>
                </div>
            </div>
            <div className="font-monospace shadow-lg rounded-3 border-4" style={{ backgroundColor: "#ffffff" }}>
                {step === 1 && (< AddVendor nextStep={nextStep} data={data} setData={setData} />)}
                {step === 2 && (<AddVendorItem nextStep={nextStep} prevStep={prevStep} items={items} setItems={setItems} property={property} setProperty={setProperty}/>)}
                {step === 3 && (<PaymentMethod nextStep={nextStep} prevStep={prevStep}  handleSaveVendor={handleSaveVendor}/>)}
            </div>
            <div>
            <ToastContainer />
            </div>
        </>
    );
};

export default Vendors;
